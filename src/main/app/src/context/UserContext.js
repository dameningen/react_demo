import axios from 'axios';
import React from "react";
import { apiCallGet } from '../libs/common/apiCall';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!sessionStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  console.log('useUserState context:' + JSON.stringify(context));
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    // ログイン処理
    var params = new URLSearchParams();
    params.append('mailAddress', login);
    params.append('password', password);
    try {
      // ログイン処理実行
      await axios.post('http://localhost:8080/perform_login', params);
      sessionStorage.setItem('id_token', 1)
      // TODO：ログイン成功時はここで権限情報チェックのAPIを実行してsessionStorageに
      //       設定して画面の表示制御を行う（イマイチだがとりあえず）
      await isAdminRequest();
      console.log('localStorage.getItem_isAdmin:' + sessionStorage.getItem('isAdmin'));

      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')

    } catch (error) {
      console.error(error.stack || error);
      // TODO LOGIN_FAILUREのアクション未実装（いるのか？）
      // dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);

    }
  }
}
/**
 * ログインしたユーザーが管理者権限を持っているかどうかの情報を取得し、
 * localStorageに保存する。
 */
function isAdminRequest() {
  return apiCallGet('http://localhost:8080/api/account/isAdminUser')
    .then((response) => {
      console.log("★isAdmin:" + JSON.stringify(response));
      sessionStorage.setItem('isAdmin', response.data)
    });
}

function signOut(dispatch, history) {
  // localStorage.removeItem("id_token");
  sessionStorage.removeItem("id_token");
  sessionStorage.removeItem("isAdmin");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
