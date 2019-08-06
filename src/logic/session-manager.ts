import { SessionError } from 'src/service/error/session-error';

/**
 * セッション関連の管理クラス
 */
export class SessionManager {

    /**保存用のトークン */
    private static tokenKey = 'BOOKMANAGE_STORAGE_KEY';

    /**ユーザIDの保存用トークン */
    private static userid = 'BOOKMANAGE_STORAGE_KEY_USER';

    /**
     * APIアクセス用トークンの保存処理
     * @param token トークン
     */
    public static saveToken(token: string) {

        sessionStorage.setItem(SessionManager.tokenKey, token);
    }

    /**
     * ユーザIDの保存処理
     * @param userinfo ユーザID
     */
    public static saveUserInfo(userinfo: object) {
        sessionStorage.setItem(SessionManager.userid, JSON.stringify(userinfo));
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
     * ユーザIDの取得
     */
    public static loadUserInfo() : Object {
        const user = sessionStorage.getItem(SessionManager.userid);

        if (!user) {
            throw new SessionError("there is invalid session. please login first.");
        }

        return JSON.parse(user);
    }

    public static loadUserId(): string {
        return SessionManager.loadUserInfo()['id'];
    }

    public static loadUserName(): string {
        return SessionManager.loadUserInfo()['fullname'];
    }

    public static loadDepartment(): string {
        return SessionManager.loadUserInfo()['department'];
    }

    /**
     * APIアクセス用のトークンを削除する
     */
    public static removeToken() {
        sessionStorage.removeItem(SessionManager.tokenKey);
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
