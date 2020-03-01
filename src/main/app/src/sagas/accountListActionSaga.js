import { call, put } from 'redux-saga/effects';
import { FAIL_ACCOUNT_LIST_API, SUCCESS_ACCOUNT_LIST_API } from '../actions/accountListActions';
import { apiCallGet } from '../libs/common/apiCall';

/**
 * アカウント一覧（0～10件目）取得APIをコールする処理。
 */
const requestAccountListApi = async () => {
    const url = "http://localhost:8080/api/account/0/10";
    const { data, error } = await apiCallGet(url);
    return { data, error };
}

const requestAccountListForSelectApi = async () => {
    const url = "http://localhost:8080/api/account/list";
    const { data, error } = await apiCallGet(url);
    return { data, error };
}


export function* accountListSaga({ forSelect }) {
    console.log("★★★★forSelect：：：" + forSelect);
    // TODO 記法要確認
    if (forSelect) {
        const { data, error } = yield call(requestAccountListForSelectApi);
        console.log("★★★★：：：" + JSON.stringify(data));
        if (data) {
            // API成功時
            // TODO：itemsに設定するデータは要再考
            yield put({ type: SUCCESS_ACCOUNT_LIST_API, items: data.data, isLoading: false });
        } else {
            console.log("accountListSaga error:" + error.message);
            // API失敗時は空の配列を返却する
            yield put({ type: FAIL_ACCOUNT_LIST_API, items: [], isLoading: false });
        }
    } else {
        console.log("★★★★：：：TRUEじゃない！！");
        const { data, error } = yield call(requestAccountListApi);
        if (data) {
            // API成功時
            // TODO：itemsに設定するデータは要再考
            yield put({ type: SUCCESS_ACCOUNT_LIST_API, items: data.data.content, isLoading: false });
        } else {
            console.log("accountListSaga error:" + error.message);
            // API失敗時は空の配列を返却する
            yield put({ type: FAIL_ACCOUNT_LIST_API, items: [], isLoading: false });
        }
    }
}
