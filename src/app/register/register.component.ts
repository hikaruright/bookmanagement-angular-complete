import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book';
import { ListModel } from '../../models/listmodel';
import { DateUtils } from '../../logic/date';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * 登録画面のコンポーネント
 */
export class RegisterComponent implements OnInit {

  /**登録モデル */
  model: BookModel;

  publishers: ListModel[];

  departments: ListModel[];

  today: string = DateUtils.today();


  constructor(private http: HttpClient) {
    // 初期化
    this.model = new BookModel();
   }

  ngOnInit() {
  
    // 出版社一覧をセット
    this.http.get<ListModel[]>(HttpConst.url("/list/publisher"), 
    {headers: SessionManager.requestHeader()})
      .subscribe(result => {
        this.publishers = result;
        this.model.publisher = result[0].id;
      });

    // 部署一覧をセット
    this.http.get<ListModel[]>(HttpConst.url("/list/department"), 
    {headers: SessionManager.requestHeader()})
      .subscribe(result => {
        this.departments = result;
        this.model.managedDpt = result[0].id;
      })
    
  }

  /**
   * 保存処理
   * @param $event イベント
   */
  register($event) {

    alert(JSON.stringify(this.model));
  }
}
