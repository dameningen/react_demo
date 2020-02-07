import { FAIL_SBRANDOM_API, FETCH_SBRANDOM, SUCCESS_SBRANDOM_API } from '../actions/springBootRandomActions';

const initialState = {
    type: '',
    items: [],
    isLoading: false
}

const sbRandomState = (state = initialState, action) => {
    console.log("sbRandomState action.type:" + action.type);
    console.log("sbRandomState action.items:" + action.items);
    console.log("sbRandomState action.isLoading:" + action.isLoading);
    switch (action.type) {
        case FETCH_SBRANDOM:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case SUCCESS_SBRANDOM_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        case FAIL_SBRANDOM_API:
            state.type = action.type;
            state.items = action.items;
            state.isLoading = action.isLoading;
            return Object.assign({}, state);
        default:
            state.isLoading = false;
            return state;
    }
}

export default sbRandomState;