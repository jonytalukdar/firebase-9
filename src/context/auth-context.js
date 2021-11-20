import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from '../firebase.config';
const auth = getAuth(app);

const AuthContext = createContext({
  currentUser: null,
  signup: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  goggleSingIn: () => {},
  forgotPassword: (email) => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);

  //signup
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logout = () => {
    return signOut(auth);
  };

  //signinWithGoggle
  const goggleSingIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  //forgot password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const contextValue = {
    currentUser,
    signup,
    login,
    logout,
    goggleSingIn,
    forgotPassword,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
