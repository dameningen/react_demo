import { FAIL_GET_TICKET_LIST, GET_TICKET_LIST, SUCCESS_GET_TICKET_LIST } from '../actions/ticketListActions';

const initialState = {
    items: [],
    errMsg: null,
    isLoading: false
}

const ticketListState = (state = initialState, action) => {
    switch (action.type) {
        case GET_TICKET_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case SUCCESS_GET_TICKET_LIST:
            return Object.assign({}, state, {
                items: action.items,
                isLoading: action.isLoading,
            });
        case FAIL_GET_TICKET_LIST:
            return Object.assign({}, state, {
                items: action.items,
                isLoading: action.isLoading,
            });
        default:
            return state;
    }
}

export default ticketListState;