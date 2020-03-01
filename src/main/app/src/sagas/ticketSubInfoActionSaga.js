import { call, put } from 'redux-saga/effects';
import { FAIL_TICKET_SUBINFO, SUCCESS_TICKET_SUBINFO } from '../actions/ticketSubInfoActions';
import { apiCallGet } from '../libs/common/apiCall';


/**
 * チケットサブ情報取得APIをコールする処理。
 */
const requestTicketSubInfoApi = async () => {
    const url = 'http://localhost:8080/api/ticket/subInfo';
    const { data, error } = await apiCallGet(url);
    return { data, error };
}

/**
 * チケットのサブ情報を取得する。
 */
export function* ticketSubInfoSaga() {
    console.log("ticketSubInfoSaga");
    const { data, error } = yield call(requestTicketSubInfoApi);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: SUCCESS_TICKET_SUBINFO, items: data.data, isLoading: false });
    } else {
        console.log("ticketDetailSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_TICKET_SUBINFO, items: [], isLoading: false });
    }
}
