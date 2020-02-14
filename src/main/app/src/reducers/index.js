import { combineReducers } from 'redux';
import accountDetailState from './accountDetailReducer';
import accountListState from './accountListReducer';
import sbRandomState from './sbRandomReducer';
import ticketDetailState from './ticketDetailReducer';
import ticketListState from './ticketListReducer';

const rootReducer = combineReducers({
    sbRandomState,
    ticketListState,
    ticketDetailState,
    accountListState,
    accountDetailState
});

export default rootReducer;