// アカウント情報を取得するアクション
export const FETCH_ACCOUNT_LIST = 'FETCH_ACCOUNT_LIST'
export const SUCCESS_ACCOUNT_LIST_API = 'SUCCESS_ACCOUNT_LIST_API'
export const FAIL_ACCOUNT_LIST_API = 'FAIL_ACCOUNT_LIST_API'

export const fetchAccountList = () => {
    return {
        type: FETCH_ACCOUNT_LIST,
        items: [],
        isLoading: true,
    }
};
