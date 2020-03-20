// チケット情報を取得するアクション
export const GET_TICKET_LIST = 'GET_TICKET_LIST'
export const SUCCESS_GET_TICKET_LIST = 'SUCCESS_GET_TICKET_LIST'
export const FAIL_GET_TICKET_LIST = 'FAIL_GET_TICKET_LIST'

export const getTicketList = () => {
    return {
        type: GET_TICKET_LIST,
        items: [],
        isLoading: true
    }
};

