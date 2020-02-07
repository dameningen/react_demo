

// サンプル実装用
export const FETCH_SBRANDOM = 'FETCH_SBRANDOM'
export const SUCCESS_SBRANDOM_API = 'SUCCESS_SBRANDOM_API'
export const FAIL_SBRANDOM_API = 'FAIL_SBRANDOM_API'

export const fetchSbRandom = () => {
    return {
        type: FETCH_SBRANDOM,
        items: [],
        isLoading: true
    }
};

