import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  /**検索条件 */
  @Input() searchModel: SearchCondition;
  searchForm: FormGroup;

  /** 取得した書籍の一覧情報 */
  books: BookListDto[];

  /**
   * コンストラクタ
   * @param http HTTP通信モジュール
   */
  constructor(private http: HttpClient) {
    this.searchModel = new SearchCondition();
  }

  /**
   * 画面ロード時のイベント
   */
  ngOnInit() {
    // 条件なしで検索を行う
    this.search(null);

  }

  /**
   * 検索処理
   * @param $event イベント
   */
  search($event) {

    if (!this.searchModel.title
      && !this.searchModel.author
      && !this.searchModel.publisher) {

      // 検索内容がない場合、全件を取得する。

      // ヘッダにx-access-tokenをつけて送信する
      this.http.get<BookListDto[]>(HttpConst.url("/books"), {
        headers: SessionManager.requestHeader()
      }).subscribe((list) => {
        this.books = list;
      });
    } else {

      this.http.post<BookListDto[]>(HttpConst.url("/books"), {
        title: this.searchModel.title,
        author: this.searchModel.author,
        publisher: this.searchModel.publisher
      }, { headers: SessionManager.requestHeader() })
        .subscribe((list) => {
          this.books = list;
        });
    }
  }

  clicked($event, book: BookListDto) {

    let id = book.id;
    //alert(id);
    location.href = "/detail/" + id;
  }


}

/**
 * 検索条件
 */
class SearchCondition {
  /** タイトル */
  public title: string;
  /** 著者 */
  public author: string;
  /** 出版社*/
  public publisher: string;
}

/**
 * 一覧に表示する書籍情報
 */
class BookListDto {

  /**
   * コンストラクタ
   * @param id ID
   * @param title タイトル
   * @param author 著者
   * @param publisher 出版社
   */
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public publisher: string,
  ) {

  }

}