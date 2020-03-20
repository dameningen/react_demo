import { restDelete, restGet, restPost, restPut } from '../common/restClient';

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

// アカウント情報操作 ======================================
/**
 * アカウント一覧取得APIをコールする処理。
 */
export const callGetAccountList = () => {
    const url = ACCOUNT_API;
    return restGet(url);;
}

/**
 * アカウント情報取得APIをコールする処理。
 * @param {*} accountId アカウントID
 */
export const callGetAccount = (accountId) => {
    const url = ACCOUNT_API + '/' + accountId;
    return restGet(url);
}

/**
 * アカウント作成APIをコールする処理。
 * @param {*} regAccountInfo 登録するアカウント情報
 */
export const callRegisterAccount = (regAccountInfo) => {
    const url = ACCOUNT_API;
    return restPost(url, regAccountInfo);
}

/**
 * アカウント更新APIをコールする処理。
 * @param {*} updAccountInfo 更新するアカウント情報
 */
export const callUpdateAccount = (updAccountInfo) => {
    const url = ACCOUNT_API + '/' + updAccountInfo.id;
    return restPut(url, updAccountInfo);
}

/**
 * アカウント削除APIをコールする処理。
 * @param {*} accountId 削除対象のアカウントID
 */
export const callDeleteAccount = (accountId) => {
    const url = ACCOUNT_API + '/' + accountId;
    return restDelete(url);
}

// チケット情報操作 ======================================
/**
 * チケット一覧取得APIをコールする処理。
 */
export const callGetTicketList = () => {
    const url = TICKET_API;
    return restGet(url);;
}

/**
 * チケット情報取得APIをコールする処理。
 * @param {*} ticketId チケットID
 */
export const callGetTicket = (ticketId) => {
    const url = TICKET_API + '/' + ticketId;
    return restGet(url);
}

/**
 * チケットサブ情報取得APIをコールする処理。
 */
export const callGetTicketSubInfo = () => {
    const url = TICKET_API + '/subInfo';
    return restGet(url);
}

/**
 * チケット新規登録APIをコールする処理。
 * @param {*} regTicketInfo 登録するチケット情報
 */
export const callRegisterTicket = (regTicketInfo) => {
    const url = TICKET_API;
    return restPost(url, regTicketInfo);
}

/**
 * チケット登録APIをコールする処理。
 * @param {*} updTicketInfo 更新するチケット情報
 */
export const callUpdateTicket = (updTicketInfo) => {
    const url = TICKET_API + '/' + updTicketInfo.id;
    return restPut(url, updTicketInfo);
}

/**
 * チケット削除APIをコールする処理。
 * @param {*} ticketId 削除するチケットID
 */
export const callDeleteTicket = (ticketId) => {
    const url = TICKET_API + '/' + ticketId;
    return restDelete(url);
}

