// アカウント情報を取得するアクション
export const GET_ACCOUNT_DETAIL = 'GET_ACCOUNT_DETAIL'
export const SUCCESS_GET_ACCOUNT_DETAIL = 'SUCCESS_GET_ACCOUNT_DETAIL'
export const FAIL_GET_ACCOUNT_DETAIL = 'FAIL_GET_ACCOUNT_DETAIL'

// アカウント情報を更新するアクション
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const SUCCESS_ACCOUNT_UPDATE = 'SUCCESS_ACCOUNT_UPDATE'
export const FAIL_ACCOUNT_UPDATE = 'FAIL_ACCOUNT_UPDATE'


export const getAccountDetail = (accountId) => {
    return {
        type: GET_ACCOUNT_DETAIL,
        items: [],
        isLoading: true,
        accountId: accountId
    }
};

export const updateAccountDetail = (values) => {
    return {
        type: UPDATE_ACCOUNT,
        updateValues: values,
        isLoading: true
    }
};
