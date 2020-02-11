import { combineReducers } from 'redux';
import sbRandomState from './sbRandomReducer';
import ticketListState from './ticketListReducer';

const rootReducer = combineReducers({
    sbRandomState,
    ticketListState
});

export default rootReducer;