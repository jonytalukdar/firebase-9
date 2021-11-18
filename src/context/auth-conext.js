import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
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
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = !!currentUser.accessToken;

  //signup
  const signUp = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await response.user;
      setCurrentUser(user);
      setIsLoading(false);
      setError('');
      navigate('/', { replace: true });
    } catch (error) {
      setError(error.code);
      setIsLoading(false);
    }
  };

  //login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = await response.user;
      setCurrentUser(user);
      setIsLoading(false);
      setError('');
      navigate('/', { replace: true });
    } catch (error) {
      setError(error.code);
      setIsLoading(false);
    }
  };

  //forgot password
  const forgotPassword = async (email) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setIsLoading(false);
      setError('');
    } catch (error) {
      setError(error.code);
      setIsLoading(false);
    }
  };

  // //update email
  // const updateEmailAddress = (email) => {
  //   setIsLoading(true);
  //   try {
  //     updateEmail(auth.currentUser, email);
  //     setIsLoading(false);
  //     setError('');
  //   } catch (error) {
  //     setError(error.code);
  //     setIsLoading(false);
  //   }
  // };

  // //update password
  // const updateUserPassword = (password) => {
  //   setIsLoading(true);
  //   try {
  //     updatePassword(auth.currentUser, password);
  //     setIsLoading(false);
  //     setError('');
  //   } catch (error) {
  //     setError(error.code);
  //     setIsLoading(false);
  //   }
  // };

  function updateEmailAddress(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

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
    error,
    isLoading,
    isLogin,
    signUp,
    login,
    logout,
    forgotPassword,
    updateEmailAddress,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
