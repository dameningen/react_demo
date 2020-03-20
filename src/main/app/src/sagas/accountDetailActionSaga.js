import { call, put } from 'redux-saga/effects';
import { FAIL_ACCOUNT_UPDATE, FAIL_GET_ACCOUNT_DETAIL, SUCCESS_ACCOUNT_UPDATE, SUCCESS_GET_ACCOUNT_DETAIL } from '../actions/accountDetailActions';
import { callGetAccount, callUpdateAccount } from '../libs/api/apiCall';

/**
 * アカウント情報を取得する。
 * @param {*} accountId 取得対象アカウントID 
 */
export function* accountDetailSaga({ accountId }) {
    console.log("★アカウント情報取得開始 accountId:" + accountId);
    const { data, error } = yield call(callGetAccount, accountId);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_GET_ACCOUNT_DETAIL, items: data.data, isLoading: false });
    } else {
        // API失敗時
        // エラーメッセージ設定
        // レスポンスにエラー情報が設定されている場合はその情報、
        // そうでない場合はHTTPエラーメッセージを設定する
        let errMsg = error.response.data.errors ? error.response.data.errors : error.message;
        console.error("◆アカウント情報取得エラー:" + errMsg);
        console.dir(error.response.data.errors);
        yield put({ type: FAIL_GET_ACCOUNT_DETAIL, errMsg: errMsg, isLoading: false });
    }
}

/**
 * アカウント情報を更新する。
 * @param {*} updateValues 更新対象アカウント情報
 */
export function* accountUpdateSaga({ updateValues }) {
    console.log("★アカウント情報更新開始 updateValues:" + JSON.stringify(updateValues));
    const { data, error } = yield call(callUpdateAccount, updateValues);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_ACCOUNT_UPDATE, updateValues: data.data, isLoading: false });
    } else {
        // API失敗時
        // エラーメッセージ設定
        // レスポンスにエラー情報が設定されている場合はその情報、
        // そうでない場合はHTTPエラーメッセージを設定する
        let errMsg = error.response.data.errors ? error.response.data.errors : error.message;
        console.error("◆アカウント情報更新エラー:" + errMsg);
        console.dir(error.response.data.errors);
        yield put({ type: FAIL_ACCOUNT_UPDATE, errMsg: errMsg, isLoading: false });
    }
}