import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';

// リクエスト先ホストのポート番号
/* 
 * TODO：外部定義して可変にしておく。
 *       フロントエンドとバックエンドを同一ホスト上で動かす場合はaxiosの
 *       baseUrlをdocument.location.hostでポートまで取れば良いのでこの定義は不要
 */
const HOST_PORT_NUM = '8080';

axios.defaults.withCredentials = true;
const restClient = axios.create(
    {
        // baseURL: 'http://' + document.location.host,
        baseURL: 'http://' + document.location.hostname + ':' + HOST_PORT_NUM,
    }
);

// Cookieに登録されているXSRFトークンのキー
const COOKIE_KEY_XSRF_TOKEN = 'XSRF-TOKEN';
// リクエスト実行時にリクエストヘッダに乗せるXSRFトークンのキー
const HEDER_KEY_XSRF_TOKEN = 'X-XSRF-TOKEN';

/**
 * Cookieから任意の値を取得し返却する。
 * @param {*} cname 取得対象のキー
 */
const getCookie = (cname) => {
    let name = cname + '=';
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * リクエストヘッダにCookieから取得したXSRF-TOKENを設定する
 */
// TODO axiosは自動でX-XSRF-TOKENをリクエストヘッダに乗せてくれるからいらない
const requstHeaderSetting = () => {
    axiosCookieJarSupport(restClient);
    let xsrfToken = getCookie(COOKIE_KEY_XSRF_TOKEN);
    // console.log('Cookieから取得したXSRF-TOKEN:' + xsrfToken);
    // リクエストヘッダにCookieから取得したXSRF-TOKENを設定する
    restClient.defaults.headers[HEDER_KEY_XSRF_TOKEN] = xsrfToken;
}

/**
 * 
 * @param {*} endPointPath リクエスト対象URIのパス部分 
 * @param {*} params リクエストパラメータ
 */
export const loginClient = async (endPointPath, params = {}) => {
    console.log('■loginClient:' + params);
    try {
        let loginResponse = await restClient.post(endPointPath, params);
        console.log('★ログインレスポンス:' + JSON.stringify(loginResponse));
        return loginResponse;
    } catch (error) {
        console.log('■ログインエラー：' + JSON.stringify(error));
        throw error;
    }
}

/**
 * GETリクエストを実行する。
 * @param {*} endPoint エンドポイント
 * @param {*} params API実行パラメータ
 */
export const restGet = (endPoint, params) => {
    console.log('■restGet:' + endPoint);

    // リクエストヘッダ設定
    // requstHeaderSetting();

    return restClient.get(
        endPoint,
        params,
        { withCredentials: true, }
    )
        .then((response) => {
            console.log('apiCarestGetllGet レスポンス');
            console.dir(response.data);
            return response;
        })
        .catch((error) => {
            console.error(error.stack || error);
            return { error };
        });
}

/**
 * POSTリクエストを実行する。
 * @param {*} endPoint エンドポイント
 * @param {*} params API実行パラメータ
 */
export const restPost = (endPoint, params = {}) => {
    console.log('■restPost:' + endPoint);

    // リクエストヘッダ設定
    // requstHeaderSetting();

    return restClient.post(
        endPoint,
        params,
        { withCredentials: true, }
    )
        .then((response) => {
            console.log("restPost レスポンス");
            console.dir(response.data);
            return response;
        })
        .catch((error) => {
            console.error(error.stack || error);
            return { error };
        });
}

/**
 * PUTリクエストを実行する。
 * @param {*} endPoint エンドポイント
 * @param {*} params API実行パラメータ
 */
export const restPut = (endPoint, params = {}) => {
    console.log('■restPut:' + endPoint);

    return restClient.put(
        endPoint,
        params,
        { withCredentials: true, }
    )
        .then((response) => {
            console.log("restPost レスポンス");
            console.dir(response.data);
            return response;
        })
        .catch((error) => {
            console.error(error.stack || error);
            return { error };
        });
}

/**
 * DELETEリクエストを実行する。
 * @param {*} endPoint エンドポイント
 * @param {*} params API実行パラメータ
 */
export const restDelete = (endPoint, params = {}) => {
    console.log('■restDelete:' + endPoint);

    return restClient.delete(
        endPoint,
        params,
        { withCredentials: true, }
    )
        .then((response) => {
            console.log("restDelete レスポンス");
            console.dir(response.data);
            return response;
        })
        .catch((error) => {
            console.error(error.stack || error);
            return { error };
        });
}

