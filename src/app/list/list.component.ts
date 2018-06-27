import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpConst } from '../../logic/http-const';
import { SessionManager } from '../../logic/session-manager';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() searchModel: SearchCondition;
  searchForm: FormGroup;

  books: BookListDto[];

  constructor(private http: HttpClient) {
    this.searchModel = new SearchCondition();
   }

  ngOnInit() {

    this.search(null);

  }

  /**
   * 検索処理
   * @param $event イベント
   */
  search($event) {

    if(!this.searchModel.title 
      && !this.searchModel.author 
      && !this.searchModel.publisher) {

        // 検索内容がない場合、全件を取得する。

        // ヘッダにx-access-tokenをつけて送信する
        this.http.get<BookListDto[]>(HttpConst.url("/books"), {
          headers: SessionManager.requestHeader()
        }).subscribe((list) => {
            this.books = list;
          });
    }else {

      this.http.post<BookListDto[]>(HttpConst.url("/books"), {
        title: this.searchModel.title,
        author: this.searchModel.author,
        publisher: this.searchModel.publisher
      }, { headers: SessionManager.requestHeader()})
        .subscribe((list) => {
          this.books = list;
        });
    }
  }

  clicked($event, book: BookListDto) {

    let id = book.id;
    //alert(id);
    location.href="/detail/"+id;
  }


}

class SearchCondition {
  public title: string;
  public author: string;
  public publisher: string;
}

class BookListDto {

  constructor(
    public id: string,
    public title: string,
    public author: string,
    public publisher: string,
  ) {

  }

}