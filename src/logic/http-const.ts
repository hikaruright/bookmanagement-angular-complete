import { environment } from 'src/environments/environment';

/**
 * Http系の定数クラス
 */
export class HttpConst {

    /**
     * サーバのエンドポイント
     */
    public static endpoint = environment.endpoint;

    /**
     * URLを返却
     * @param path パス
     */
    public static url(path: string) {
        console.log(environment.endpoint)
        return environment.endpoint + path;
    }

}
