import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookModel } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: string;

  // 表示モデル
  model: BookModel;

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.model = new BookModel();
  }

  ngOnInit() {
    // 書籍情報を取得する
    let sub = this.route.params.subscribe(params => {
      this.id = params["id"];

      // httpで取得する
      this.http.get<BookModel>(HttpConst.url("/book/"+this.id),{headers: SessionManager.requestHeader()})
        .subscribe(data => {
          this.model = data;
        });
    });
  }

}
