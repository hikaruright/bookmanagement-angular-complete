/**
 * セッション関連の管理クラス
 */
export class SessionManager {

    /**保存用のトークン */
    private static tokenKey = 'BOOKMANAGE_STORAGE_KEY';

    /**
     * APIアクセス用トークンの保存処理
     * @param token トークン
     */
    public static saveToken(token: string) {

        sessionStorage.setItem(SessionManager.tokenKey, token);
    }

    /**
     * APIアクセス用トークンの取得処理
     */
    public static loadToken() {
        const token = sessionStorage.getItem(SessionManager.tokenKey);
        // console.log(token);
        return token;
    }

    /**
     * リクエスト用のヘッダを生成
     */
    public static requestHeader() {
        return {
            'x-access-token': SessionManager.loadToken()
        };
    }
}
