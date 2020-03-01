import { FAIL_TICKET_SUBINFO, FETCH_TICKET_SUBINFO, SUCCESS_TICKET_SUBINFO } from '../actions/ticketSubInfoActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false
}

const ticketSubInfoState = (state = initialState, action) => {
    console.log("ticketSubInfoState action.type:" + action.type);
    console.log("ticketSubInfoState action.items:" + JSON.stringify(action.items));
    console.log("ticketSubInfoState action.isLoading:" + action.isLoading);
    switch (action.type) {
        // チケットサブ情報取得
        case FETCH_TICKET_SUBINFO:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_TICKET_SUBINFO:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_TICKET_SUBINFO:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);

        default:
            state.isLoading = false;
            return state;
    }
}

export default ticketSubInfoState;