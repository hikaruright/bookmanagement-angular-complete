import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book';
import { ListModel } from '../../models/listmodel';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;

  model: BookModel;

  publishers: ListModel[];

  departments: ListModel[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.model = new BookModel();

  }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params["id"];

      // httpで取得する
      this.http.get<BookModel>(HttpConst.url("/book/" + this.id), { headers: SessionManager.requestHeader() })
        .subscribe(data => {
          this.model = data;
          this.model.id = this.id;
        });
    });
    // 出版社一覧をセット
    this.http.get<ListModel[]>(HttpConst.url("/list/publisher"),
      { headers: SessionManager.requestHeader() })
      .subscribe(result => {
        this.publishers = result;
        //this.model.publisher = result[0].id;
      });

    // 部署一覧をセット
    this.http.get<ListModel[]>(HttpConst.url("/list/department"),
      { headers: SessionManager.requestHeader() })
      .subscribe(result => {
        this.departments = result;
        //this.model.managedDpt = result[0].id;
      })
    // httpで取得する
    this.http.get<BookModel>(HttpConst.url("/book/" + this.id), { headers: SessionManager.requestHeader() })
      .subscribe(data => {
        this.model = data;
      });
  }

  /**
   * 登録処理
   */
  register() {
    //alert(this.model.id + "?" + this.id);
    if(confirm("登録します。よろしいですか？")) {
      this.model.id = this.id;
      this.http.post(HttpConst.url("/book"), 
        this.model, 
        {headers: SessionManager.requestHeader()})
        .subscribe(result => {
          if(!result["result"]) {
            alert("サーバにてエラーが発生しました。");
          } else {
            alert ("登録に成功しました。");
            let id = result["id"];

            location.href="/detail/"+id;
          }
        });
    }
    
  }

}
