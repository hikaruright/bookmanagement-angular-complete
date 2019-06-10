/**
 * 検索用モデル
 */
export class SearchCondition {
    /** タイトル */
    title: string;
    /** 著者 */
    author: string;
    /** 出版社 */
    publisher: string;
    /** 自部門限定チェック */
    onlyMineDep: boolean;
}
