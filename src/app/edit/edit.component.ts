import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book';
import { ListModel } from '../../models/listmodel';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';
import { ActivatedRoute } from '@angular/router';

/**
 * 書籍情報更新コンポーネント
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  /** 編集する書籍のID(URLにて取得) */
  id: string;

  /** 表示・編集する書籍の情報 */
  model: BookModel;

  /** 画面に表示する出版社の情報 */
  publishers: ListModel[];

  /** 画面に表示する部署の一覧 */
  departments: ListModel[];

  /**
   * コンストラクタ
   * @param http HTTP通信を行うためのモジュール
   * @param route ルート情報
   */
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.model = new BookModel();

  }

  ngOnInit() {
    
  }
}
