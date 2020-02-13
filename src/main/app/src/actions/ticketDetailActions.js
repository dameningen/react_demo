// チケット情報を取得するアクション
export const FETCH_TICKET_DETAIL = 'FETCH_TICKET_DETAIL'
export const SUCCESS_TICKET_DETAIL_API = 'SUCCESS_TICKET_DETAIL_API'
export const FAIL_TICKET_DETAIL_API = 'FAIL_TICKET_DETAIL_API'

export const fetchTicketDetail = (ticketId) => {
    return {
        type: FETCH_TICKET_DETAIL,
        items: [],
        isLoading: true,
        ticketId: ticketId
    }
};

