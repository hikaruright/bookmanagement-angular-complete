import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { FormGroup } from '@angular/forms';
import { SearchCondition } from '../../../models';

/**
 * リストヘッダ(検索部)のコンポーネント
 */
@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent implements OnInit {

  /**検索条件 */
  searchModel: SearchCondition;
  searchForm: FormGroup;

  /**
   * コンストラクタ
   * @param listService リストサービス
   */
  constructor(private listService: ListService) {
    this.searchModel = new SearchCondition();
  }

  ngOnInit() {
  }

  /**
   * 検索実行
   */
  search() {
    this.listService.search(this.searchModel);
  }
}
