import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';

/**
 * 入力用のログインモデル
 */
export class LoginModel {

  constructor(
    /** User ID */
    public userid: string,
    /** Password */
    public password: string) {}
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
  constructor(public http: HttpClient) {
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

        // tokenを保存
        SessionManager.saveToken(token);
        // リストへ遷移
        location.href = '/list';
      }
    });

  }
}
