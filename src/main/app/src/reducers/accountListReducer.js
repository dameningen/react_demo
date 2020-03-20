import { FAIL_GET_ACCOUNT_LIST, GET_ACCOUNT_LIST, SUCCESS_GET_ACCOUNT_LIST } from '../actions/accountListActions';

const initialState = {
    items: [],
    errMsg: null,
    isLoading: false,
}

const accountListState = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case SUCCESS_GET_ACCOUNT_LIST:
            return Object.assign({}, state, {
                items: action.items,
                isLoading: action.isLoading,
            });

        case FAIL_GET_ACCOUNT_LIST:
            return Object.assign({}, state, {
                items: action.items,
                isLoading: action.isLoading,
            });
        default:
            return state;
    }
}

export default accountListState;