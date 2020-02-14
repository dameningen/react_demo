// アカウント情報を取得するアクション
export const FETCH_ACCOUNT_DETAIL = 'FETCH_ACCOUNT_DETAIL'
export const SUCCESS_ACCOUNT_DETAIL_API = 'SUCCESS_ACCOUNT_DETAIL_API'
export const FAIL_ACCOUNT_DETAIL_API = 'FAIL_ACCOUNT_DETAIL_API'

// アカウント情報を更新するアクション
export const UPDATE_ACCOUNT_DETAIL = 'UPDATE_ACCOUNT_DETAIL'
export const SUCCESS_ACCOUNT_UPDATE_API = 'SUCCESS_ACCOUNT_UPDATE_API'
export const FAIL_ACCOUNT_UPDATE_API = 'FAIL_ACCOUNT_UPDATE_API'


export const fetchAccountDetail = (accountId) => {
    return {
        type: FETCH_ACCOUNT_DETAIL,
        items: [],
        isLoading: true,
        accountId: accountId
    }
};

export const updateAccountDetail = (values) => {
    return {
        type: UPDATE_ACCOUNT_DETAIL,
        updateValues: values,
        isLoading: true
    }
};

