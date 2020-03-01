// チケットサブ情報（カテゴリ、優先度、ステータス）を取得するアクション
export const FETCH_TICKET_SUBINFO = 'FETCH_TICKET_SUBINFO'
export const SUCCESS_TICKET_SUBINFO = 'SUCCESS_TICKET_SUBINFO'
export const FAIL_TICKET_SUBINFO = 'FAIL_TICKET_SUBINFO'

export const fetchTicketSubInfo = () => {
    return {
        type: FETCH_TICKET_SUBINFO,
        items: [],
        isLoading: true,
    }
};

