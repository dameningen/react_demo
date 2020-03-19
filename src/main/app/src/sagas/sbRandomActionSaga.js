import { call, put } from 'redux-saga/effects';
import { FAIL_SBRANDOM_API, SUCCESS_SBRANDOM_API } from '../actions/springBootRandomActions';
import { apiCallGet } from '../libs/common/apiCall';

/**
 * SpringBootの試験用APIをコールする処理。
 */
const requestSbRandomApi = () => {
    const url = "/api/sbRandom";
    return apiCallGet(url);
}

export function* fetchSbRandomSaga() {
    const { data, error } = yield call(requestSbRandomApi);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_SBRANDOM_API, items: data, isLoading: false });
    } else {
        console.log("fetchSbRandomSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_SBRANDOM_API, items: [], isLoading: false });
    }
}
