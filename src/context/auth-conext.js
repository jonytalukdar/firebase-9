import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isLogin = !!currentUser.accessToken;

  //signup
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setCurrentUser(res.user);
        setError('');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //login
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setCurrentUser(res.user);
        setError('');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //forgot password
  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('');
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //logout
  const logout = () => {
    auth.signOut();
    setCurrentUser({});
  };

  useEffect(() => {
    const cleanup = auth.onAuthStateChanged((user) => {
      setCurrentUser((prevState) => {
        return { ...prevState, ...user };
      });
      setLoading(false);
    });
    return cleanup;
  }, []);

  const contextValue = {
    currentUser,
    signUp,
    login,
    error,
    logout,
    isLogin,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
