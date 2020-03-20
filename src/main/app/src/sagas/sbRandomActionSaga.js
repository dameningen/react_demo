import { call, put } from 'redux-saga/effects';
import { FAIL_SBRANDOM_API, SUCCESS_SBRANDOM_API } from '../actions/springBootRandomActions';
import { callSbRandom } from '../libs/api/apiCall';

export function* fetchSbRandomSaga() {
    const { data, error } = yield call(callSbRandom);
    if (data) {
        // API成功時
        yield put({ type: SUCCESS_SBRANDOM_API, items: data, isLoading: false });
    } else {
        console.log("fetchSbRandomSaga error:" + error.message);
        // API失敗時は空の配列を返却する
        yield put({ type: FAIL_SBRANDOM_API, items: [], isLoading: false });
    }
}
