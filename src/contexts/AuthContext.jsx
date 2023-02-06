import React, { useState } from 'react'

export const AuthContext = React.createContext()

export const AuthContextProvider = ( {children} ) => {
  const [signIn, setSignIn] = useState(false)

  const signInHandler = () => {
    setSignIn(!signIn)
  }
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signInHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}