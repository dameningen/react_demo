import { call, put } from 'redux-saga/effects';
import { FAIL_GET_TICKET_DETAIL, FAIL_TICKET_REGISTER, FAIL_TICKET_UPDATE, SUCCESS_GET_TICKET_DETAIL, SUCCESS_TICKET_REGISTER, SUCCESS_TICKET_UPDATE } from '../actions/ticketDetailActions';
import { callDeleteTicket, callGetTicket, callRegisterTicket, callUpdateTicket } from '../libs/api/apiCall';

/**
 * チケット詳細情報を取得する
 * @param {*} ticketId 取得対象チケットID 
 */
export function* ticketDetailGetSaga({ ticketId }) {
    console.log("★チケット情報取得開始 ticketId:" + ticketId);
    const { data, error } = yield call(callGetTicket, ticketId);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_GET_TICKET_DETAIL, items: data.data, isLoading: false });
    } else {
        // API失敗時
        // エラーメッセージ設定
        // レスポンスにエラー情報が設定されている場合はその情報、
        // そうでない場合はHTTPエラーメッセージを設定する
        let errMsg = error.response.data.errors ? error.response.data.errors : error.message;
        console.error("◆チケット情報取得エラー:" + errMsg);
        console.dir(error.response.data.errors);
        yield put({ type: FAIL_GET_TICKET_DETAIL, items: [], errMsg: errMsg, isLoading: false });
    }
}

/**
 * チケットを登録する。
 * @param {*} updateValues 登録対象のチケット情報 
 */
export function* ticketRegisterSaga({ updateValues }) {
    console.log("★チケット登録開始 updateValues:" + JSON.stringify(updateValues));
    const { data, error } = yield call(callRegisterTicket, updateValues);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_TICKET_REGISTER, updateValues: data.data, isLoading: false });
    } else {
        // API失敗時
        // エラーメッセージ設定
        // レスポンスにエラー情報が設定されている場合はその情報、
        // そうでない場合はHTTPエラーメッセージを設定する
        let errMsg = error.response.data.errors ? error.response.data.errors : error.message;
        console.error("◆チケット登録エラー:" + errMsg);
        console.dir(error.response.data.errors);
        yield put({ type: FAIL_TICKET_REGISTER, errMsg: errMsg, isLoading: false });
    }
}

/**
 * チケットを更新する。
 * @param {*} updateValues 更新対象のチケット情報 
 */
export function* ticketUpdateSaga({ updateValues }) {
    console.log("★チケット更新開始 updateValues:" + JSON.stringify(updateValues));
    const { data, error } = yield call(callUpdateTicket, updateValues);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_TICKET_UPDATE, updateValues: data.data, isLoading: false });
    } else {
        // API失敗時
        // エラーメッセージ設定
        // レスポンスにエラー情報が設定されている場合はその情報、
        // そうでない場合はHTTPエラーメッセージを設定する
        let errMsg = error.response.data.errors ? error.response.data.errors : error.message;
        console.error("◆チケット更新エラー:" + errMsg);
        console.dir(error.response.data.errors);
        yield put({ type: FAIL_TICKET_UPDATE, errMsg: errMsg, isLoading: false });
    }
}

/**
 * チケットを削除する。
 * @param {*} ticketId 削除対象チケットID 
 */
export function* ticketDeleteSaga({ ticketId }) {
    console.log("★チケット情報削除開始 ticketId:" + ticketId);
    const { data, error } = yield call(callDeleteTicket, ticketId);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_GET_TICKET_DETAIL, items: data.data, isLoading: false });
    } else {
        // API失敗時
        // エラーメッセージ設定
        // レスポンスにエラー情報が設定されている場合はその情報、
        // そうでない場合はHTTPエラーメッセージを設定する
        let errMsg = error.response.data.errors ? error.response.data.errors : error.message;
        console.error("◆チケット情報削除エラー:" + errMsg);
        console.dir(error.response.data.errors);
        yield put({ type: FAIL_GET_TICKET_DETAIL, items: [], errMsg: errMsg, isLoading: false });
    }
}