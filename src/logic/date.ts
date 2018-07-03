/**
 * 日付系ユーティリティ
 */
export class DateUtils {

    /**
     * 本日の日付を返却
     */
    static today() {
        return this.format(new Date());
    }

    /**
     * 日付をフォーマットして返却
     * @param dt 日付
     */
    static format(dt: Date) {

        // フォーマット
        var nowStr = dt.getFullYear()
            + "/" + ("00"+(dt.getMonth()+1)).slice(-2)
            + "/" + ("00"+dt.getDate()).slice(-2);

            // フォーマット化された日付を返却
            return nowStr;
    }

}