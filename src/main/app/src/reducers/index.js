import { combineReducers } from 'redux';
import accountDetailState from './accountDetailReducer';
import accountListState from './accountListReducer';
import sbRandomState from './sbRandomReducer';
// import sbRandom from '../moducks/sbRandomSearch'
import ticketDetailState from './ticketDetailReducer';
import ticketListState from './ticketListReducer';
import ticketSubInfoState from './ticketSubInfoReducer';

const rootReducer = combineReducers({
    sbRandomState,
    // sbRandom,
    ticketListState,
    ticketDetailState,
    ticketSubInfoState,
    accountListState,
    accountDetailState
});

export default rootReducer;