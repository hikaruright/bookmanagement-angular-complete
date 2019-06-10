import { SessionError } from 'src/service/error/session-error';

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
        // ↓のコメントを外すと、コンソールにトークンが出力されます
        // console.log(token);

        if(!token) {
            throw new SessionError("there is invalid session. please login first.");
        }

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
