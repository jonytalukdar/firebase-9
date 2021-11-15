import React, { createContext, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);

export const AuthContext = createContext({
  token: '',
  isLogin: false,
  signUp: (email, password) => {},
  login: (email, password) => {},
  error: '',
});

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const initialToken = localStorage.getItem('accessToken');
  const [token, setToken] = useState(initialToken);
  const [error, setError] = useState('');

  const isLogin = !!token;

  //singup handler
  const signUpHandler = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { accessToken } = userCredential.user;
        setToken(accessToken);
        setError('');
        navigate('/');
        localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //login handler
  const loginHandler = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { accessToken } = userCredential.user;
        setToken(accessToken);
        navigate('/');
        localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //context value
  const contextValue = {
    token,
    isLogin,
    signUp: signUpHandler,
    login: loginHandler,
    error,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
