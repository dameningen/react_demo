import { call, put } from 'redux-saga/effects';
import { FAIL_GET_TICKET_SUBINFO, SUCCESS_GET_TICKET_SUBINFO } from '../actions/ticketSubInfoActions';
import { callGetTicketSubInfo } from '../libs/api/apiCall';

/**
 * チケットのサブ情報を取得する。
 */
export function* ticketSubInfoSaga() {
    console.log("ticketSubInfoSaga");
    const { data, error } = yield call(callGetTicketSubInfo);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: FAIL_GET_TICKET_SUBINFO, items: data.data, isLoading: false });
    } else {
        console.log("ticketDetailSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: SUCCESS_GET_TICKET_SUBINFO, items: [], isLoading: false });
    }
}
