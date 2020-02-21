import { format, parseISO } from 'date-fns';
import ja from 'date-fns/locale/ja';

const DEFAULT_FORMAT = 'yyyy年MM月dd日 HH:mm:ss';

/**
 * パラメータに設定された日付表現文字列を指定された表示形式に変換して返却する（jaロケール）。
 * @param {*} val 変換対象の日時文字列
 * @param {*} dateFormat 変換フォーマット
 * （dateFormatを設定しない場合はデフォルトで'yyyy年MM月dd日 HH:mm:ss'に変換する）
 */
export const convDateTIme = (val, dateFormat) => {
    let dateStr = ''
    if (val) {
        if (!dateFormat) {
            dateFormat = DEFAULT_FORMAT;
        }
        dateStr = format(parseISO(val), dateFormat, { local: ja })
    }
    return dateStr;
}

