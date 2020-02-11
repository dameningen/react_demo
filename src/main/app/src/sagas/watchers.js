import { takeLatest } from 'redux-saga/effects';
import { FETCH_SBRANDOM } from '../actions/springBootRandomActions';
import { FETCH_TICKET_LIST } from '../actions/ticketListActions';
import { fetchSbRandomSaga } from './sbRandomActionSaga';
import { ticketListSaga } from './ticketListActionSaga';


export default function* watchUserAuthentication() {
    yield takeLatest(FETCH_SBRANDOM, fetchSbRandomSaga);
    yield takeLatest(FETCH_TICKET_LIST, ticketListSaga);
}