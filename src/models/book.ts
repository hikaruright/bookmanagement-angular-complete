export class BookModel {

    constructor(
        public id: string = null,
        public title: string = null,
        public autor: string = null,
        public publisher: string = null,
        public publisherName: string = null,
        public price: number = null,
        public purchased: string = null,
        public managedDpt: string = null,
        public managedDptName: string = null,
        public updated: string = null,
        public updator: string = null,
        public updatorDpt: string = null
    ) { }
}