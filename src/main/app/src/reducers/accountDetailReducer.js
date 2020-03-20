import { FAIL_ACCOUNT_UPDATE, FAIL_GET_ACCOUNT_DETAIL, GET_ACCOUNT_DETAIL, SUCCESS_ACCOUNT_UPDATE, SUCCESS_GET_ACCOUNT_DETAIL, UPDATE_ACCOUNT } from '../actions/accountDetailActions';

const initialState = {
    items: [], // 取得したアカウント詳細情報
    updateValues: {}, // 登録または更新するアカウント情報
    errMsg: null,
    isLoading: false
}

/**
 * アカウント詳細情報Reducer。
 * @param {*} state 
 * @param {*} action 
 */
const accountDetailState = (state = initialState, action) => {
    switch (action.type) {
        // アカウント情報取得
        case GET_ACCOUNT_DETAIL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case SUCCESS_GET_ACCOUNT_DETAIL:
            return Object.assign({}, state, {
                items: action.items,
                errMsg: null,
                isLoading: action.isLoading,
            });

        case FAIL_GET_ACCOUNT_DETAIL:
            return Object.assign({}, state, {
                errMsg: action.errMsg,
                isLoading: action.isLoading,
            });

        // アカウント更新
        case UPDATE_ACCOUNT:
            return Object.assign({}, state, {
                updateValues: action.updateValues,
                isLoading: action.isLoading,
            });
        case SUCCESS_ACCOUNT_UPDATE:
            return Object.assign({}, state, {
                updateValues: {},
                errMsg: null,
                isLoading: action.isLoading,
            });
        case FAIL_ACCOUNT_UPDATE:
            return Object.assign({}, state, {
                updateValues: {},
                errMsg: action.errMsg,
                isLoading: action.isLoading,
            });

        default:
            return state;
    }
}

export default accountDetailState;