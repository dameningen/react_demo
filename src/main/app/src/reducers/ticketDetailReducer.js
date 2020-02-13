import { FAIL_TICKET_DETAIL_API, FETCH_TICKET_DETAIL, SUCCESS_TICKET_DETAIL_API } from '../actions/ticketDetailActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false
}

const ticketDetailState = (state = initialState, action) => {
    console.log("ticketDetailState action.type:" + action.type);
    console.log("ticketDetailState action.items:" + JSON.stringify(action.items));
    console.log("ticketDetailState action.isLoading:" + action.isLoading);
    switch (action.type) {
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
        default:
            state.isLoading = false;
            return state;
    }
}

export default ticketDetailState;