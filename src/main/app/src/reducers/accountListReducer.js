import { FAIL_ACCOUNT_LIST_API, FETCH_ACCOUNT_LIST, SUCCESS_ACCOUNT_LIST_API } from '../actions/accountListActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false,
    forSelect: false
}

const accountListState = (state = initialState, action) => {
    console.log("accountListState action.type:" + action.type);
    console.log("accountListState action.items:" + JSON.stringify(action.items));
    console.log("accountListState action.isLoading:" + action.isLoading);
    switch (action.type) {
        case FETCH_ACCOUNT_LIST:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            state.forSelect = action.forSelect;
            return Object.assign({}, state);
        case SUCCESS_ACCOUNT_LIST_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            state.forSelect = action.forSelect;
            return Object.assign({}, state);
        case FAIL_ACCOUNT_LIST_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            state.forSelect = action.forSelect;
            return Object.assign({}, state);
        default:
            state.isLoading = false;
            return state;
    }
}

export default accountListState;