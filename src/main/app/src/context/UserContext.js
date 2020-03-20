import React from "react";
import { loginClient } from '../libs/common/restClient';

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
      let loginInfo = await loginClient('/perform_login', params);
      let loginInfoData = loginInfo.data;
      let username = loginInfoData.username;
      let isAdmin = loginInfoData.isAdmin;
      sessionStorage.setItem('id_token', 1);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('isAdmin', isAdmin);

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

function signOut(dispatch, history) {
  // localStorage.removeItem("id_token");
  sessionStorage.removeItem("id_token");
  sessionStorage.removeItem("isAdmin");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
