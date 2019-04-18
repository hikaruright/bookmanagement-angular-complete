/**
 * 一覧に表示する書籍情報
 */
export class BookListModel {

  /**
   * コンストラクタ
   * @param id ID
   * @param title タイトル
   * @param author 著者
   * @param publisher 出版社
   */
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public publisher: string,
  ) { }
}
