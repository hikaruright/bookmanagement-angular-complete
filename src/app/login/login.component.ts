import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: LoginModel;
  loginForm: FormGroup;

  /** コンストラクタ */
  constructor(public http: HttpClient) {
    // this.createForm();
    this.model = new LoginModel(null, null);
  }

  ngOnInit() {
  }

  /**
   * ログイン
   */
  login() {
    
    // Execute login

    this.http.post(HttpConst.url("/login"), {
      userid: this.model.userid,
      passwd: this.model.password
    }).subscribe((result) => {
      if(!!result["message"]) {
        alert(result["message"]);
      }else if(result["token"]) {
        let token = result["token"] as string;

        // tokenを保存
        SessionManager.saveToken(token);

        location.href="/list";
      }
    });

  }
}

export class LoginModel {

  constructor(
    public userid: string, 
    public password: string ){}
}
