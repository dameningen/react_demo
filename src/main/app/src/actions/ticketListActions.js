// チケット情報を取得するアクション
export const FETCH_TICKET_LIST = 'FETCH_TICKET_LIST'
export const SUCCESS_TICKET_LIST_API = 'SUCCESS_TICKET_LIST_API'
export const FAIL_TICKET_LIST_API = 'FAIL_TICKET_LIST_API'

export const fetchTicketList = () => {
    return {
        type: FETCH_TICKET_LIST,
        items: [],
        isLoading: true
    }
};

