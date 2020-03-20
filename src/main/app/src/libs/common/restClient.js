import axios from 'axios';

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

    return restClient.get(
        endPoint,
        params,
        { withCredentials: true, }
    )
        .then((response) => {
            console.log('restGet レスポンス');
            console.dir(response.data);
            return response;
        })
        .catch((error) => {
            console.error(error.stack || error);
            console.log('restGet error');
            console.dir(error);
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

