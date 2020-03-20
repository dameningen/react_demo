// チケット情報を取得するアクション
export const GET_TICKET_DETAIL = 'GET_TICKET_DETAIL'
export const SUCCESS_GET_TICKET_DETAIL = 'SUCCESS_GET_TICKET_DETAIL'
export const FAIL_GET_TICKET_DETAIL = 'FAIL_GET_TICKET_DETAIL'

// チケット情報を登録するアクション
export const REGISTER_TICKET = 'REGISTER_TICKET'
export const SUCCESS_TICKET_REGISTER = 'SUCCESS_TICKET_REGISTER'
export const FAIL_TICKET_REGISTER = 'FAIL_TICKET_REGISTER'

// チケット情報を更新するアクション
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const SUCCESS_TICKET_UPDATE = 'SUCCESS_TICKET_UPDATE'
export const FAIL_TICKET_UPDATE = 'FAIL_TICKET_UPDATE'

// チケット情報を削除するアクション
export const DELETE_TICKET = 'DELETE_TICKET'
export const SUCCESS_TICKET_DELETE = 'SUCCESS_TICKET_DELETE'
export const FAIL_TICKET_DELETE = 'FAIL_TICKET_DELETE'

export const getTicketDetail = (ticketId) => {
    return {
        type: GET_TICKET_DETAIL,
        ticketId: ticketId,
        items: [],
        isLoading: true,
    }
};

export const registerTicketDetail = (values) => {
    return {
        type: REGISTER_TICKET,
        items: [],
        updateValues: values,
        isLoading: true
    }
};

export const updateTicketDetail = (values) => {
    return {
        type: UPDATE_TICKET,
        updateValues: values,
        isLoading: true
    }
};

export const deleteTicketDetail = (ticketId) => {
    return {
        type: DELETE_TICKET,
        ticketId: ticketId,
        isLoading: true
    }
};
