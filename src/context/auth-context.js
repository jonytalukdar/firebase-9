import React, { createContext, useContext, useState, useEfffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase.config';
const auth = getAuth(app);

const AuthContext = createContext({
  currentUser: null,
  signup: (email, password) => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //signup
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const contextValue = {
    currentUser,
    signup,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
