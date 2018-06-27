import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() loginModel: LoginModel;
  loginForm: FormGroup;

  /** コンストラクタ */
  constructor(public fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      userid: '',
      password: ''
    });
  }

  /**
   * ログイン
   */
  login() {
    alert("aaaaa?"+this.loginModel);
    alert(this.loginModel.userid + ', ' + this.loginModel.password);
    //location.href='/list';

  }
}

class LoginModel {
  /** ユーザID */
  public userid: string;

  /** パスワード */
  public password: string;
}
