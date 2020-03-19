import { FAIL_ACCOUNT_LIST_API, FETCH_ACCOUNT_LIST, SUCCESS_ACCOUNT_LIST_API } from '../actions/accountListActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false,
}

const accountListState = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT_LIST:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_ACCOUNT_LIST_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_ACCOUNT_LIST_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        default:
            state.isLoading = false;
            return state;
    }
}

export default accountListState;