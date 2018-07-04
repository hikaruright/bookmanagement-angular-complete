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
    
  }
}
