import { combineReducers } from 'redux';
import sbRandomState from './sbRandomReducer';

const rootReducer = combineReducers({
    sbRandomState
});

export default rootReducer;