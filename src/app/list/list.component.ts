import { Component, OnInit } from '@angular/core';
import { BookListModel } from '../../models';
import { ListService } from './list.service';
import { Router } from '@angular/router';
import { SessionManager } from 'src/logic/session-manager';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  /** 取得した書籍の一覧情報 */
  books: BookListModel[] = [];

  /**
   * コンストラクタ
   * @param http HTTP通信モジュール
   * @param router URLルーター
   */
  constructor(private listService: ListService, private router: Router) { }

  /**
   * 画面ロード時のイベント
   */
  ngOnInit() {

    // 検索中のイベントをバインドする
    this.listService.searchExecSubject.subscribe(condition => {
      // リストを空にする
      this.books = [];
    });

    // 問１：検索完了時のイベントをバインドする

    // 条件なしで検索を行う
    this.listService.search(null);
  }

  /**
   * 一覧取得完了時のイベント
   * @param list 検索結果
   */
  onSearchCompleted(list: BookListModel[]) {
    this.books = list;
  }

  /**
   * 行選択時のイベント
   * @param _event イベント
   * @param book 選択行の情報
   */
  clicked(_event, book: BookListModel) {

    const id = book.id;
    this.router.navigate(['/detail', id]);
  }

  /**
   * ログアウト
   */
  logout() {
    SessionManager.removeToken();
    this.router.navigate(['/']);
  }
}
