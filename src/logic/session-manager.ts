
export class SessionManager {

    /**保存用のトークン */
    private static tokenKey: string = "BOOKMANAGE_STORAGE_KEY";

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
        return sessionStorage.getItem(SessionManager.tokenKey)
    }

    /**
     * リクエスト用のヘッダを生成
     */
    public static requestHeader() {
        return {
            "x-access-token": SessionManager.loadToken()
        };
    }
}