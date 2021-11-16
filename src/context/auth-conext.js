import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../firebase.config';
const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log(currentUser);

  //signup
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError('');
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //login
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError('');
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  useEffect(() => {
    const cleanup = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return cleanup;
  }, []);

  const contextValue = {
    signUp,
    login,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
