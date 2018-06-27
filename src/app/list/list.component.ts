import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() searchModel: SearchCondition;
  searchForm: FormGroup;

  books: BookListDto[];

  constructor(public fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.searchForm = this.fb.group({
      title: '',
      author: '',
      publisher: '',
    });
  }

  search($event) {
  }

  clicked($event, book: BookListDto) {

    let id = book.id;
    alert(id);
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