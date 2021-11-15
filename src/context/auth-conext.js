import React, { createContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase.config';
const auth = getAuth(app);

export const AuthContext = createContext({
  user: null,
  signUp: (email, password) => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const signUpHandler = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  //context value
  const contextValue = {
    user,
    signUp: signUpHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
