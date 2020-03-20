import { call, put } from 'redux-saga/effects';
import { FAIL_TICKET_LIST_API, SUCCESS_TICKET_LIST_API } from '../actions/ticketListActions';
import { callGetTicketList } from '../libs/api/apiCall';

export function* ticketListSaga() {
    const { data, error } = yield call(callGetTicketList);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: SUCCESS_TICKET_LIST_API, items: data.data, isLoading: false });
    } else {
        console.log("ticketListSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_TICKET_LIST_API, items: [], isLoading: false });
    }
}
