import React, { createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const contextValue = {
    j: 'hell',
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
