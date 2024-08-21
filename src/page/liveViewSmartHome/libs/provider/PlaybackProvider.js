import React from "react";

const { createContext, useReducer, useContext } = React;

const initialState = {
  authTab: "",
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

export const PlaybackContext = createContext(initialState);
export const PlaybackDispatchContext = createContext(null);

export function authReducer(authProvider, action) {
  switch (action.type) {
    default:
      throw Error("Unknown action: " + action.type);
  }
}

const AuthMngtProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <PlaybackContext.Provider value={state}>
      <PlaybackDispatchContext.Provider value={dispatch}>
        {children}
      </PlaybackDispatchContext.Provider>
    </PlaybackContext.Provider>
  );
};

export default AuthMngtProvider;

export function usePlaybackContext() {
  return useContext(PlaybackContext);
}

export function useAuthDispatch() {
  return useContext(PlaybackDispatchContext);
}
