import { call, put } from 'redux-saga/effects';
import { FAIL_GET_TICKET_LIST, SUCCESS_GET_TICKET_LIST } from '../actions/ticketListActions';
import { callGetTicketList } from '../libs/api/apiCall';

export function* ticketListSaga() {
    const { data, error } = yield call(callGetTicketList);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: SUCCESS_GET_TICKET_LIST, items: data.data, isLoading: false });
    } else {
        console.log("ticketListSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_GET_TICKET_LIST, items: [], isLoading: false });
    }
}
