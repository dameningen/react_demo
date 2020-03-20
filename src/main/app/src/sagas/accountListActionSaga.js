import { call, put } from 'redux-saga/effects';
import { FAIL_GET_ACCOUNT_LIST, SUCCESS_GET_ACCOUNT_LIST } from '../actions/accountListActions';
import { callGetAccountList } from '../libs/api/apiCall';

/**
 * アカウント情報一覧取得。
 */
export function* accountListSaga() {
    console.log("★アカウント情報一覧取得開始");
    const { data, error } = yield call(callGetAccountList);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_GET_ACCOUNT_LIST, items: data.data, isLoading: false });
    } else {
        // API失敗時
        // エラーメッセージ設定
        // レスポンスにエラー情報が設定されている場合はその情報、
        // そうでない場合はHTTPエラーメッセージを設定する
        let errMsg = error.response.data.errors ? error.response.data.errors : error.message;
        console.error("◆アカウント情報一覧取得エラー:" + errMsg);
        console.dir(error.response.data.errors);
        yield put({ type: FAIL_GET_ACCOUNT_LIST, items: [], errMsg: errMsg, isLoading: false });
    }
}
