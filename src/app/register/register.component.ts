import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book';
import { ListModel } from '../../models/listmodel';
import { DateUtils } from '../../logic/date';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  submitted = false;

  /** 登録者部署 */
  updator: string;

  /** 更新者部署 */
  updatorDepartment: string;

  constructor(private http: HttpClient, private router: Router) {
    // 初期化
    this.model = new BookModel();
   }

   ngOnInit() {

    // 出版社一覧をセット
    this.http.get<ListModel[]>(HttpConst.url('/list/publisher'),
    {headers: SessionManager.requestHeader()})
      .subscribe(result => {
        this.publishers = result;
        this.model.publisher = result[0].id;
      });

    // 部署一覧をセット
    this.http.get<ListModel[]>(HttpConst.url('/list/department'),
    {headers: SessionManager.requestHeader()})
      .subscribe(result => {
        this.departments = result;
        // this.model.managedDpt = result[0].id;

        const loginUserDepart = SessionManager.loadDepartment();

        // 自分の部署情報を取得
        result.filter((row, i) => {
          return row.id === loginUserDepart;
        }).forEach((row, i) => {
          this.updatorDepartment = row.label;
          this.model.managedDpt = row.id;
        });
      });

    // 更新者情報
    this.model.updator = SessionManager.loadUserName();
  }

  /**
   * 保存処理
   * @param $event イベント
   */
  register($event, form: NgForm) {

    // 一度submitされている。
    this.submitted = true;

    // デバッグ用。何かわからない事があればこれで中身を確認できます。
    // console.log(JSON.stringify(this.model));

    // Formの中にバリデーションエラーがある場合
    if (form.invalid) {
      return false;
    }

    if (confirm('登録します。よろしいですか？')) {

      this.http.post(HttpConst.url('/book'),
        this.model,
        {headers: SessionManager.requestHeader()})
        .subscribe(result => {
          // 成功した？
          if (!result['result']) {
            // 失敗
            alert('サーバにてエラーが発生しました。');
            return;
          } else {
            alert('登録に成功しました。');
            const id = result['id'];

            this.router.navigate(['/detail', id]);
          }
        });
    }
  }
}
