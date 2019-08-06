import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';
import { Router } from '@angular/router';

/**
 * 入力用のログインモデル
 */
export class LoginModel {

  constructor(
    /** User ID */
    public userid: string,
    /** Password */
    public password: string) { }
}

/**
 * ログインコンポーネント
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**ログインモデル */
  model = new LoginModel(null, null);

  /** コンストラクタ */
  constructor(public http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * ログイン
   */
  login() {

    // Execute login

    this.http.post(HttpConst.url('/login'), {
      userid: this.model.userid,
      passwd: this.model.password
    }).subscribe((result) => {
      if (!!result['message']) {
        alert(result['message']);
      } else if (result['token']) {
        const token = result['token'] as string;

        this.http.get(HttpConst.url('/user/'+this.model.userid))
          .subscribe((result) => {
            // tokenを保存
            SessionManager.saveToken(token);

            SessionManager.saveUserInfo(result);

            // リストへ遷移
            this.router.navigate(['/list']);
          })

      }
    });

  }
}
