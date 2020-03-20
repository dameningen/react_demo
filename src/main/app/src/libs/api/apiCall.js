import { restGet, restPost, restPut } from '../common/restClient';

// SpringBootのサンプルAPI
const SPRING_BOOT_SAMPLE_API = "/api/sbRandom";
// アカウント操作APIエンドポイント
const ACCOUNT_API = "/api/accounts";
// チケット操作APIエンドポイント
const TICKET_API = "/api/tickets";

/**
 * SpringBootの試験用APIをコールする処理。
 */
export const callSbRandom = () => {
    const url = SPRING_BOOT_SAMPLE_API;
    return restGet(url);
}

/**
 * アカウント情報取得APIをコールする処理。
 */
export const callGetAccountInfo = async (accountId) => {
    const url = ACCOUNT_API + '/' + accountId;
    const { data, error } = await restGet(url);
    return { data, error };
}

/**
 * アカウント情報更新APIをコールする処理。
 */
export const callUpdateAccountInfo = async (values) => {
    const url = ACCOUNT_API + '/' + values.id;
    const { data, error } = await restPut(url, values);
    return { data, error };
}

/**
 * アカウント一覧取得APIをコールする処理。
 */
export const callGetAccountList = () => {
    const url = ACCOUNT_API;
    return restGet(url);;
}


/**
 * チケット情報取得APIをコールする処理。
 * @param {*} ticketId チケットID
 */
export const callGetTicketInfo = (ticketId) => {
    const url = TICKET_API + '/' + ticketId;
    return restGet(url);
}

/**
 * チケット情報更新APIをコールする処理。
 * @param {*} updTicketInfo 更新するチケット情報
 */
export const callUpdateTicketInfo = async (updTicketInfo) => {
    const url = TICKET_API + '/' + updTicketInfo.id;
    return restPut(url, updTicketInfo);
}

/**
 * チケット一覧取得APIをコールする処理。
 */
export const callGetTicketList = () => {
    const url = TICKET_API;
    return restGet(url);;
}

/**
 * チケットサブ情報取得APIをコールする処理。
 */
export const callGetTicketSubInfo = () => {
    const url = TICKET_API + '/subInfo';
    return restGet(url);
}