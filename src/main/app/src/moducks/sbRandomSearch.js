/**
 * SpringBootの動作確認用？のAPIを実行するモジュールをModucksを利用して実装する。
 */
import Moducks from 'moducks';
import { call } from 'redux-saga/effects';
import { apiCallGet } from '../libs/common/apiCall';

const initialState = {
    items: [],
    errors: [],
    isLoading: false,
}

/**
 * SpringBootの試験用APIをコールする処理。
 */
const requestSbRandomApi = () => {
    const url = "http://localhost:8080/api/sbRandom";
    return apiCallGet(url);
}

// sbRandom(reducer), sagas, actionCreator各種を， createModule関数の返り値を展開することによって一気に宣言する
const {
    sbRandom, sbRandomSagas,
    getSbRandom, getSbRandomSuccess, getSbRandomFail, getSbRandomClear,
} = Moducks.createModule('sbRandom', {

    GET: {
        reducer: state => ({
            ...state,
            isLoading: true,
        }),

        // saga として定義したジェネレータ関数は自動的に takeEvery でラップされる
        // return した action は自動で yield put() される
        saga: function* (action) {
            // getSbRandomSuccessは遅延評価されるので ReferenceError にならない
            return getSbRandomSuccess(yield call(requestSbRandomApi));
        },
        // onError を定義することによって，try ~ catch を省略することができる
        // return した action は自動で yield put() される
        // getSbRandomFail は遅延評価されるので ReferenceError にならない
        onError: (e, action) => getSbRandomFail(e),
    },

    // reducer のみを定義する場合はオブジェクトリテラルを使わずにそのまま渡してよい
    GET_SUCCESS: (state, { payload: data }) => ({
        ...state,
        items: data,
        isLoading: false,
    }),

    GET_FAILURE: (state, { payload: e }) => ({
        ...state,
        errors: [...state.errors, e.message],
        isLoading: false,
    }),

    CLEAR: state => ({
        ...state,
        items: [],
        errors: [],
    }),

}, initialState)


export default sbRandom
export { sbRandomSagas, getSbRandom, getSbRandomClear };

