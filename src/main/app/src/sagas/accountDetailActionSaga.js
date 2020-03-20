import { call, put } from 'redux-saga/effects';
import { FAIL_ACCOUNT_DETAIL_API, FAIL_ACCOUNT_UPDATE_API, SUCCESS_ACCOUNT_DETAIL_API, SUCCESS_ACCOUNT_UPDATE_API } from '../actions/accountDetailActions';
import { callGetAccountInfo, callUpdateAccountInfo } from '../libs/api/apiCall';

export function* accountDetailSaga({ accountId }) {
    console.log("★accountDetailSaga accountId:" + accountId);
    const { data, error } = yield call(callGetAccountInfo, accountId);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: SUCCESS_ACCOUNT_DETAIL_API, items: data.data, isLoading: false });
    } else {
        console.log("accountDetailSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_ACCOUNT_DETAIL_API, items: [], isLoading: false });
    }
}

export function* accountUpdateSaga({ updateValues }) {
    console.log("accountUpdateSaga updateValues:" + JSON.stringify(updateValues));
    const { data, error } = yield call(callUpdateAccountInfo, updateValues);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        yield put({ type: SUCCESS_ACCOUNT_UPDATE_API, updateValues: data.data, isLoading: false });
    } else {
        console.log("accountUpdateSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_ACCOUNT_UPDATE_API, updateValues: [], isLoading: false });
    }
}