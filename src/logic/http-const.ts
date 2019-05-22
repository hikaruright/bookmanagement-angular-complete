/**
 * Http系の定数クラス
 */
export class HttpConst {

    /**
     * サーバのエンドポイント
     */
    public static endpoint = 'https://bookmanagement.solxyz.app/api/';

    /**
     * URLを返却
     * @param path パス
     */
    public static url(path: string) {
        return HttpConst.endpoint + path;
    }

}
