import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';

const COOKIE_KEY_XSRF_TOKEN = 'XSRF-TOKEN';
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
 * ヘッダにCookieから取得したXSRF-TOKENを
 * 乗せてGETでAPIを実行する。
 * @param {*} endPoint エンドポイント
 * @param {*} params API実行パラメータ
 */
export const apiCallGet = (endPoint, params) => {
    axiosCookieJarSupport(axios);
    let cookieJar = new tough.CookieJar();
    let xsrfToken = getCookie(COOKIE_KEY_XSRF_TOKEN);
    console.log('Cookieから取得したXSRF-TOKEN:' + xsrfToken);
    // リクエストヘッダにCookieから取得したXSRF-TOKENを設定する
    axios.defaults.headers[HEDER_KEY_XSRF_TOKEN] = xsrfToken;

    axios
        .get(endPoint,
            params,
            {
                jar: cookieJar,
                withCredentials: true,
            }
        )
        .then((response) => {
            console.log('apiCallGet ステータスコード:' + response.status + ':' + response.statusText);
            console.log('apiCallGet レスポンス' + JSON.stringify(response.data));
            return response;
        })
        .catch((err) => {
            console.error(err.stack || err);
            return { err };
        });
}

/**
 * 
 * @param {*} endPoint エンドポイント
 * @param {*} params API実行パラメータ
 */
export const apiCallPost = (endPoint, params = {}) => {
    axiosCookieJarSupport(axios);
    let cookieJar = new tough.CookieJar();

    let xsrfToken = getCookie(COOKIE_KEY_XSRF_TOKEN);
    console.log('Cookieから取得したXSRF-TOKEN:' + xsrfToken);
    // リクエストヘッダにCookieから取得したXSRF-TOKENを設定する
    axios.defaults.headers[HEDER_KEY_XSRF_TOKEN] = xsrfToken;

    axios
        .post(endPoint,
            params,
            {
                jar: cookieJar,
                withCredentials: true,
            }
        )
        .then((response) => {
            // const config = response.config;
            console.log("apiCallPost ステータスコード" + response.status);
            console.log("apiCallPost レスポンス" + JSON.stringify(response.data));
            return response;
        })
        .catch((err) => {
            console.error(err.stack || err);
            return { err };
        });
}
