import { takeLatest } from 'redux-saga/effects';
import { FETCH_SBRANDOM } from '../actions/springBootRandomActions';
import { fetchSbRandomSaga } from './sbRandomActionSaga';


export default function* watchUserAuthentication() {
    yield takeLatest(FETCH_SBRANDOM, fetchSbRandomSaga);
}