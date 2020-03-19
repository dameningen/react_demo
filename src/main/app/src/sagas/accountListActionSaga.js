import { call, put } from 'redux-saga/effects';
import { FAIL_ACCOUNT_LIST_API, SUCCESS_ACCOUNT_LIST_API } from '../actions/accountListActions';
import { apiCallGet } from '../libs/common/apiCall';

/**
 * アカウント一覧取得APIをコールする処理。
 */
const getAccountList = async () => {
    const url = "/api/account/list";
    const { data, error } = await apiCallGet(url);
    return { data, error };
}

export function* accountListSaga() {
    // TODO 記法要確認
    const { data, error } = yield call(getAccountList);
    if (data) {
        // API成功時
        // TODO：itemsに設定するデータは要再考
        console.log("accountListSaga data:" + JSON.stringify(data));
        yield put({ type: SUCCESS_ACCOUNT_LIST_API, items: data.data, isLoading: false });
    } else {
        console.log("accountListSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_ACCOUNT_LIST_API, items: [], isLoading: false });
    }
}
