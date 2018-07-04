/**
 * Http系の定数クラス
 */
export class HttpConst {

    /**
     * サーバのエンドポイント
     */
    public static endpoint = 'http://localhost:3000';

    /**
     * URLを返却
     * @param path パス
     */
    public static url(path: string) {
        return HttpConst.endpoint + path;
    }

}