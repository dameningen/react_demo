// アカウント情報を取得するアクション
export const GET_ACCOUNT_LIST = 'GET_ACCOUNT_LIST'
export const SUCCESS_GET_ACCOUNT_LIST = 'SUCCESS_GET_ACCOUNT_LIST'
export const FAIL_GET_ACCOUNT_LIST = 'FAIL_GET_ACCOUNT_LIST'

export const getAccountList = () => {
    return {
        type: GET_ACCOUNT_LIST,
        items: [],
        isLoading: true,
    }
};
