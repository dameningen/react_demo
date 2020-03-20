import { DELETE_TICKET, FAIL_GET_TICKET_DETAIL, FAIL_TICKET_DELETE, FAIL_TICKET_REGISTER, FAIL_TICKET_UPDATE, GET_TICKET_DETAIL, REGISTER_TICKET, SUCCESS_GET_TICKET_DETAIL, SUCCESS_TICKET_DELETE, SUCCESS_TICKET_REGISTER, SUCCESS_TICKET_UPDATE, UPDATE_TICKET } from '../actions/ticketDetailActions';

const initialState = {
    items: [], // 取得したチケット詳細情報
    updateValues: {}, // 登録または更新するチケット情報
    errMsg: null,
    isLoading: false
}

const ticketDetailState = (state = initialState, action) => {
    switch (action.type) {
        // チケット情報取得
        case GET_TICKET_DETAIL:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case SUCCESS_GET_TICKET_DETAIL:
            return Object.assign({}, state, {
                items: action.items,
                errMsg: null,
                isLoading: action.isLoading,
            });

        case FAIL_GET_TICKET_DETAIL:
            return Object.assign({}, state, {
                errMsg: action.errMsg,
                isLoading: action.isLoading,
            });

        // チケット登録
        case REGISTER_TICKET:
            return Object.assign({}, state, {
                updateValues: action.updateValues,
                isLoading: action.isLoading,
            });

        case SUCCESS_TICKET_REGISTER:
            return Object.assign({}, state, {
                updateValues: {},
                errMsg: null,
                isLoading: action.isLoading,
            });

        case FAIL_TICKET_REGISTER:
            return Object.assign({}, state, {
                updateValues: {},
                errMsg: action.errMsg,
                isLoading: action.isLoading,
            });


        // チケット更新
        case UPDATE_TICKET:
            return Object.assign({}, state, {
                updateValues: action.updateValues,
                isLoading: action.isLoading,
            });

        case SUCCESS_TICKET_UPDATE:
            return Object.assign({}, state, {
                updateValues: {},
                errMsg: null,
                isLoading: action.isLoading,
            });

        case FAIL_TICKET_UPDATE:
            return Object.assign({}, state, {
                updateValues: {},
                errMsg: action.errMsg,
                isLoading: action.isLoading,
            });

        // チケット削除
        case DELETE_TICKET:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case SUCCESS_TICKET_DELETE:
            return Object.assign({}, state, {
                errMsg: null,
                isLoading: action.isLoading,
            });

        case FAIL_TICKET_DELETE:
            return Object.assign({}, state, {
                errMsg: action.errMsg,
                isLoading: action.isLoading,
            });
        default:
            return state;
    }
}

export default ticketDetailState;