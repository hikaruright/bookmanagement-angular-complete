import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book';
import { ListModel } from '../../models/listmodel';
import { DateUtils } from '../../logic/date';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * 登録画面のコンポーネント
 */
export class RegisterComponent implements OnInit {

  /** リアクティブフォーム */
  bookForm: FormGroup;

  /**登録モデル */
  model: BookModel;

  publishers: ListModel[];

  departments: ListModel[];

  today: string = DateUtils.today();


  constructor(private http: HttpClient, public fb: FormBuilder) {
    // 初期化
    this.model = new BookModel();
    this.createForm();
   }

   createForm() {
    this.bookForm = this.fb.group({
      id: '',
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      purchased: ['', [Validators.required, Validators.pattern('^\d{4}[\/.]\d{1,2}[\/.]\d{1,2}$')]],
      managedDpt: ['', Validators.required]
    })
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

    //TODO バリデーションをつける。

    // デバッグ用。何かわからない事があればこれで中身を確認できます。
    // console.log(JSON.stringify(this.model));

    if(confirm("登録します。よろしいですか？")) {

      this.http.post(HttpConst.url("/book"),
        this.model,
        {headers: SessionManager.requestHeader()})
        .subscribe(result => {
          // 成功した？
          if(!result["result"]) {
            // 失敗
            if(!!result["validated"]) {
              // エラーをマッピング
              
              return;
            }
          }else {
            alert("登録に成功しました。");
            let id = result["id"];

            location.href = "/detail/"+id;
          }
        });
    }
  }
}
