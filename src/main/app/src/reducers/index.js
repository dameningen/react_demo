import { combineReducers } from 'redux';
import sbRandomState from './sbRandomReducer';
import ticketDetailState from './ticketDetailReducer';
import ticketListState from './ticketListReducer';

const rootReducer = combineReducers({
    sbRandomState,
    ticketListState,
    ticketDetailState
});

export default rootReducer;