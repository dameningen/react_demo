import { FAIL_TICKET_DETAIL_API, FAIL_TICKET_UPDATE_API, FETCH_TICKET_DETAIL, SUCCESS_TICKET_DETAIL_API, SUCCESS_TICKET_UPDATE_API, UPDATE_TICKET_DETAIL } from '../actions/ticketDetailActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false
}

const ticketDetailState = (state = initialState, action) => {
    switch (action.type) {
        // チケット情報取得
        case FETCH_TICKET_DETAIL:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_TICKET_DETAIL_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_TICKET_DETAIL_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        // 更新
        case UPDATE_TICKET_DETAIL:
            state.type = action.type;
            state.updateValues = action.updateValues;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_TICKET_UPDATE_API:
            state.type = action.type;
            state.updateValues = action.updateValues;
            state.items = action.updateValues;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_TICKET_UPDATE_API:
            state.type = action.type;
            state.updateValues = action.updateValues;
            state.items = action.updateValues;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        default:
            state.isLoading = false;
            return state;
    }
}

export default ticketDetailState;