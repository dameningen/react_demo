import { call, put } from 'redux-saga/effects';
import { SUCCESS_TICKET_LIST_API, FAIL_TICKET_LIST_API } from '../actions/ticketListActions';
import { apiCallGet } from '../libs/common/apiCall';


/**
 * チケット一覧（0～10件目）取得APIをコールする処理。
 */
const requestTicketListApi = () => {
    const url = "http://localhost:8080/api/ticket/0/10";
    return apiCallGet(url);
}

export function* ticketListSaga() {
    const { data, error } = yield call(requestTicketListApi);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: SUCCESS_TICKET_LIST_API, items: data.data.content, isLoading: false });
    } else {
        console.log("ticketListSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_TICKET_LIST_API, items: [], isLoading: false });
    }
}
