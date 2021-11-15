import React, { createContext, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../firebase.config';
const auth = getAuth(app);

export const AuthContext = createContext({
  token: '',
  isLogin: false,
  signUp: (email, password) => {},
  login: (email, password) => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const isLogin = !!token;

  //singup handler
  const signUpHandler = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { accessToken } = userCredential.user;
        setToken(accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  //login handler
  const loginHandler = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { accessToken } = userCredential.user;
        setToken(accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  //context value
  const contextValue = {
    token,
    isLogin,
    signUp: signUpHandler,
    login: loginHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
