/**
 * 文書情報の詳細情報
 */
export class BookModel {

    constructor(
        // ID
        public id: string = null,
        // タイトル
        public title: string = null,
        // 著者
        public author: string = null,
        // 出版社
        public publisher: string = null,
        // 出版社名
        public publisherName: string = null,
        // 価格
        public price: number = null,
        // 購入日
        public purchased: string = null,
        // 管理部門
        public managedDpt: string = null,
        // 管理部門名
        public managedDptName: string = null,
        // 更新日
        public updated: string = null,
        // 更新者
        public updator: string = null,
        // 更新部署
        public updatorDpt: string = null,
        // 更新部署名
        public updatorDptName: string = null
    ) { }
}
