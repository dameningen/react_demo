import { FETCH_TICKET_LIST, SUCCESS_TICKET_LIST_API, FAIL_TICKET_LIST_API } from '../actions/ticketListActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false
}

const ticketListState = (state = initialState, action) => {
    console.log("ticketListState action.type:" + action.type);
    console.log("ticketListState action.items:" + JSON.stringify(action.items));
    console.log("ticketListState action.isLoading:" + action.isLoading);
    switch (action.type) {
        case FETCH_TICKET_LIST:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_TICKET_LIST_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_TICKET_LIST_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        default:
            state.isLoading = false;
            return state;
    }
}

export default ticketListState;