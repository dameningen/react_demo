import { takeLatest } from 'redux-saga/effects';
import { FETCH_ACCOUNT_DETAIL, UPDATE_ACCOUNT_DETAIL } from '../actions/accountDetailActions';
import { FETCH_ACCOUNT_LIST } from '../actions/accountListActions';
import { FETCH_TICKET_DETAIL, UPDATE_TICKET_DETAIL } from '../actions/ticketDetailActions';
import { FETCH_TICKET_LIST } from '../actions/ticketListActions';
import { FETCH_TICKET_SUBINFO } from '../actions/ticketSubInfoActions';
import { accountDetailSaga, accountUpdateSaga } from './accountDetailActionSaga';
import { accountListSaga } from './accountListActionSaga';
import { ticketDetailSaga, ticketUpdateSaga } from './ticketDetailActionSaga';
import { ticketListSaga } from './ticketListActionSaga';
import { ticketSubInfoSaga } from './ticketSubInfoActionSaga';
//import { sbRandomSagas } from '../moducks/sbRandomSearch';
import { FETCH_SBRANDOM } from '../actions/springBootRandomActions';
import { fetchSbRandomSaga } from './sbRandomActionSaga';


export default function* watchUserAuthentication() {
    yield takeLatest(FETCH_SBRANDOM, fetchSbRandomSaga);
    // yield sbRandomSagas;
    // TODO 分割について要再検討
    yield takeLatest(FETCH_TICKET_LIST, ticketListSaga);
    yield takeLatest(FETCH_TICKET_DETAIL, ticketDetailSaga);
    yield takeLatest(UPDATE_TICKET_DETAIL, ticketUpdateSaga);
    yield takeLatest(FETCH_TICKET_SUBINFO, ticketSubInfoSaga);

    yield takeLatest(FETCH_ACCOUNT_LIST, accountListSaga);
    yield takeLatest(FETCH_ACCOUNT_DETAIL, accountDetailSaga);
    yield takeLatest(UPDATE_ACCOUNT_DETAIL, accountUpdateSaga);
}