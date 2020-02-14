// チケット情報を取得するアクション
export const FETCH_TICKET_DETAIL = 'FETCH_TICKET_DETAIL'
export const SUCCESS_TICKET_DETAIL_API = 'SUCCESS_TICKET_DETAIL_API'
export const FAIL_TICKET_DETAIL_API = 'FAIL_TICKET_DETAIL_API'

// チケット情報を更新するアクション
export const UPDATE_TICKET_DETAIL = 'UPDATE_TICKET_DETAIL'
export const SUCCESS_TICKET_UPDATE_API = 'SUCCESS_TICKET_UPDATE_API'
export const FAIL_TICKET_UPDATE_API = 'FAIL_TICKET_UPDATE_API'


export const fetchTicketDetail = (ticketId) => {
    return {
        type: FETCH_TICKET_DETAIL,
        items: [],
        isLoading: true,
        ticketId: ticketId
    }
};

export const updateTicketDetail = (values) => {
    return {
        type: UPDATE_TICKET_DETAIL,
        updateValues: values,
        isLoading: true
    }
};

