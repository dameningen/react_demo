// チケットサブ情報（カテゴリ、優先度、ステータス）を取得するアクション
export const GET_TICKET_SUBINFO = 'GET_TICKET_SUBINFO'
export const SUCCESS_GET_TICKET_SUBINFO = 'SUCCESS_GET_TICKET_SUBINFO'
export const FAIL_GET_TICKET_SUBINFO = 'FAIL_GET_TICKET_SUBINFO'

export const getTicketSubInfo = () => {
    return {
        type: GET_TICKET_SUBINFO,
        items: [],
        isLoading: true,
    }
};

