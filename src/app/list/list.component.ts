import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';
import { SearchCondition } from 'src/models/search-condition';
import { BookListModel } from 'src/models/search-result';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  /** 取得した書籍の一覧情報 */
  books: BookListModel[] = [];

  hasResult: boolean = false;

  /**
   * コンストラクタ
   * @param http HTTP通信モジュール
   */
  constructor(private listService: ListService) { }

  /**
   * 画面ロード時のイベント
   */
  ngOnInit() {

    // 検索中のイベントをバインドする
    this.listService.searchExecSubject.subscribe(condition => {
      // リストを空にする
      this.books = [];
    });

    // 検索完了時のイベントをバインドする
    this.listService.searchCompleteSubject.subscribe(list => this.onSearchcompleted(list));

    // 条件なしで検索を行う
    this.listService.search(null);
  }

  /**
   * 一覧取得完了時のイベント
   * @param list 検索結果
   */
  onSearchcompleted(list: BookListModel[]) {
    this.books = list;
    this.hasResult = list.length > 0;
  }

  /**
   * 行洗濯時のイベント
   * @param _event イベント
   * @param book 選択行の情報
   */
  clicked(_event, book: BookListModel) {

    let id = book.id;
    location.href = "/detail/" + id;
  }
}