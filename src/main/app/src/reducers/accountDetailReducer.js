import { FAIL_ACCOUNT_DETAIL_API, FAIL_ACCOUNT_UPDATE_API, FETCH_ACCOUNT_DETAIL, SUCCESS_ACCOUNT_DETAIL_API, SUCCESS_ACCOUNT_UPDATE_API, UPDATE_ACCOUNT_DETAIL } from '../actions/accountDetailActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false
}

const accountDetailState = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT_DETAIL:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_ACCOUNT_DETAIL_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_ACCOUNT_DETAIL_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        // 更新
        case UPDATE_ACCOUNT_DETAIL:
            state.type = action.type;
            state.updateValues = action.updateValues;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_ACCOUNT_UPDATE_API:
            state.type = action.type;
            state.updateValues = action.updateValues;
            state.items = action.updateValues;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_ACCOUNT_UPDATE_API:
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

export default accountDetailState;