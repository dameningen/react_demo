import { call, put } from 'redux-saga/effects';
import { FAIL_TICKET_DETAIL_API, SUCCESS_TICKET_DETAIL_API } from '../actions/ticketDetailActions';
import { apiCallGet } from '../libs/common/apiCall';

/**
 * チケット一覧（0～10件目）取得APIをコールする処理。
 */
const requestTicketDetailApi = async (ticketId) => {
    const url = 'http://localhost:8080/api/ticket/' + ticketId;
    const { data, error } = await apiCallGet(url);
    return { data, error };
}

export function* ticketDetailSaga({ ticketId }) {
    console.log("★ticketDetailSaga ticketId:" + ticketId);
    const { data, error } = yield call(requestTicketDetailApi, ticketId);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: SUCCESS_TICKET_DETAIL_API, items: data.data, isLoading: false });
    } else {
        console.log("ticketDetailSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_TICKET_DETAIL_API, items: [], isLoading: false });
    }
}
