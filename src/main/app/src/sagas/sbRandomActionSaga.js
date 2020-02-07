import axios from 'axios';

import { apiCallGet } from '../libs/common/apiCall';
import { put, call } from 'redux-saga/effects';
import { SUCCESS_SBRANDOM_API, FAIL_SBRANDOM_API } from '../actions/springBootRandomActions';

/**
 * SpringBootの試験用APIをコールする処理。
 */
const requestSbRandomApi = () => {
    const url = "http://localhost:8080/api/sbRandom";
    // return apiCallGet(url);
    return axios.get(url, { withCredentials: true })
        .then((response) => {
            console.log("★axios res status:" + response.status);
            console.log("★axios res data:" + response.data);
            return response;
        })
        .catch((error) => {
            return { error };
        })
}

/**
 *
 * @param {*} items
 */
const dataConvert = (items) => {
    console.log("■■■■■■dataConvert");
    if (items !== void 0) {
        var rows = [];
        items.forEach(function (element, index, a) {
            // テーブル表示用のデータのrowを設定する
            var temp = { "type": element.type, "id": element.value.id, "quote": element.value.quote };
            rows.push(temp);
        });
        console.log("■■■■■■dataCOnvert end.");
        return rows;
    }
}

export function* fetchSbRandomSaga() {
    const { data, error } = yield call(requestSbRandomApi);
    // console.log("fetchSbRandomSaga data:" + JSON.stringify(data));

    if (data) {
        // API成功時
        //yield put({ type: SUCCESS_SBRANDOM_API, items: dataConvert(data), isLoading: false });
        yield put({ type: SUCCESS_SBRANDOM_API, items: data, isLoading: false });
    } else {
        console.log("fetchSbRandomSaga error:" + error.message + "(" + error.response.status + ")");
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_SBRANDOM_API, items: [], isLoading: false });
    }
}
