/**
 * 日付系ユーティリティ
 */
export class DateUtils {

    /**
     * 本日の日付を返却
     * @returns yyyy/MM/dd 形式の日付
     */
    static today() {
        return this.format(new Date());
    }

    /**
     * 日付をフォーマットして返却
     * @param dt 日付
     * @returns yyyy/MM/dd形式の文字列
     */
    static format(dt: Date) {

        // フォーマット
        const nowStr = dt.getFullYear()
            + '/' + ('00' + (dt.getMonth() + 1)).slice(-2)
            + '/' + ('00' + dt.getDate()).slice(-2);

        // フォーマット化された日付を返却
        return nowStr;
    }
}
