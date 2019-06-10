import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchCondition, BookModel, BookListModel } from '../../models';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  /** 検索時、通信前に呼び出されるオブザーバ */
  searchExecSubject: Subject<SearchCondition> = new Subject();

  /** 検索完了時に呼び出されるオブザーバ */
  searchCompleteSubject: Subject<BookListModel[]> = new Subject();

  /**
   * コンストラクタ
   * @param http HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * 検索の実施
   * @param condition 検索条件
   */
  search(searchModel: SearchCondition) {
    // 検索前のsubmit
    this.searchExecSubject.next(searchModel);

    // ----------
    // 検索の実施
    // ----------

    // 検索条件がある場合
    if (!!searchModel && (!!searchModel.title || !!searchModel.author || !!searchModel.publisher || searchModel.onlyMineDep)) {

      this.http.post<BookListModel[]>(HttpConst.url('/books'), {
        title: searchModel.title,
        author: searchModel.author,
        publisher: searchModel.publisher,
        depFlag: searchModel.onlyMineDep,
      }, {
        headers: SessionManager.requestHeader()
        }).subscribe((list) => {
          // 検索完了通知
          this.searchCompleteSubject.next(list);
        });

    } else {

      // 検索内容がない場合、全件を取得する。

      // ヘッダにx-access-tokenをつけて送信する
      this.http.get<BookListModel[]>(HttpConst.url('/books'), {
        headers: SessionManager.requestHeader()
      }).subscribe((list) => {
        // 検索完了通知
        this.searchCompleteSubject.next(list);
      });
    }
  }

}
