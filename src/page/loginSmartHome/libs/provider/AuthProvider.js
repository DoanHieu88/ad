import React from "react";
import { AuthAction, AuthTabPanel } from "../models/common";

const { createContext, useReducer, useContext } = React;

const initialState = {
  authTab: AuthTabPanel.LOGIN,
  captchaImage: "",
  statusModal: {
    appInstall: false,
  },
  userInfo: {
    identifier: "",
    password: "",
  },
  messageOverOtp: "",
  appId: "",
};

export const AuthContext = createContext(initialState);
export const AuthDispatchContext = createContext(null);

export function authReducer(authProvider, action) {
  switch (action.type) {
    case AuthAction.STATUS_MODAL:
      return {
        ...authProvider,
        statusModal: {
          ...authProvider.statusModal,
          appInstall: action.payload,
        },
      };
    case AuthAction.TAB:
      return {
        ...authProvider,
        authTab: action.payload,
      };
    case AuthAction.CATPCHA_STATUS:
      return {
        ...authProvider,
        captchaImage: action.payload,
      };
    case AuthAction.USER_INFO:
      return {
        ...authProvider,
        userInfo: action.payload,
      };
    case AuthAction.MESSAGE_OVER_OTP:
      return {
        ...authProvider,
        messageOverOtp: action.payload,
      };
    case AuthAction.APP_ID:
      return {
        ...authProvider,
        appId: action.payload,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
}

const AuthMngtProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthMngtProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}
