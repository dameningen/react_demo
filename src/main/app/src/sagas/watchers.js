import { takeLatest } from 'redux-saga/effects';
import { GET_ACCOUNT_DETAIL, UPDATE_ACCOUNT } from '../actions/accountDetailActions';
import { GET_ACCOUNT_LIST } from '../actions/accountListActions';
import { FETCH_SBRANDOM } from '../actions/springBootRandomActions';
import { DELETE_TICKET, GET_TICKET_DETAIL, REGISTER_TICKET, UPDATE_TICKET } from '../actions/ticketDetailActions';
import { GET_TICKET_LIST } from '../actions/ticketListActions';
import { GET_TICKET_SUBINFO } from '../actions/ticketSubInfoActions';
import { accountDetailSaga, accountUpdateSaga } from './accountDetailActionSaga';
import { accountListSaga } from './accountListActionSaga';
import { fetchSbRandomSaga } from './sbRandomActionSaga';
import { ticketDeleteSaga, ticketDetailGetSaga, ticketRegisterSaga, ticketUpdateSaga } from './ticketDetailActionSaga';
import { ticketListSaga } from './ticketListActionSaga';
import { ticketSubInfoSaga } from './ticketSubInfoActionSaga';


export default function* watchUserAuthentication() {
    yield takeLatest(FETCH_SBRANDOM, fetchSbRandomSaga);

    yield takeLatest(GET_TICKET_LIST, ticketListSaga);
    yield takeLatest(GET_TICKET_DETAIL, ticketDetailGetSaga);
    yield takeLatest(REGISTER_TICKET, ticketRegisterSaga);
    yield takeLatest(UPDATE_TICKET, ticketUpdateSaga);
    yield takeLatest(DELETE_TICKET, ticketDeleteSaga);
    yield takeLatest(GET_TICKET_SUBINFO, ticketSubInfoSaga);

    yield takeLatest(GET_ACCOUNT_LIST, accountListSaga);
    yield takeLatest(GET_ACCOUNT_DETAIL, accountDetailSaga);
    yield takeLatest(UPDATE_ACCOUNT, accountUpdateSaga);
}