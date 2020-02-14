import { takeLatest } from 'redux-saga/effects';
import { FETCH_SBRANDOM } from '../actions/springBootRandomActions';
import { FETCH_TICKET_DETAIL, UPDATE_TICKET_DETAIL } from '../actions/ticketDetailActions';
import { FETCH_TICKET_LIST } from '../actions/ticketListActions';
import { fetchSbRandomSaga } from './sbRandomActionSaga';
import { ticketDetailSaga, ticketUpdateSaga } from './ticketDetailActionSaga';
import { ticketListSaga } from './ticketListActionSaga';


export default function* watchUserAuthentication() {
    yield takeLatest(FETCH_SBRANDOM, fetchSbRandomSaga);
    // TODO 分割について要再検討
    yield takeLatest(FETCH_TICKET_LIST, ticketListSaga);
    yield takeLatest(FETCH_TICKET_DETAIL, ticketDetailSaga);
    yield takeLatest(UPDATE_TICKET_DETAIL, ticketUpdateSaga);
}