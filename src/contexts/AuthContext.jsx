import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext()

const SUPABASE_URL = "https://cdwbosztukeirqyteyss.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkd2Jvc3p0dWtlaXJxeXRleXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1NDg3MzMsImV4cCI6MTk5MTEyNDczM30.f7KEE3phpAGzcF5RjUjOQVIlvkdIB_I68YVIO_64Pj0"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export const AuthContextProvider = ( {children} ) => {
  const [dataBase, setDataBase] = useState([])
  const [signIn, setSignIn] = useState(false)

  const getDB = async () => {
    const { data: Account, error} = await supabase.from('Account').select()
    setDataBase(Account)
    if (error) {
      console.log(error)
    }
  }
  const insertData = async (user) => {
    const {error} = await supabase.from('Account').insert(user)
    if (error) {
      console.log(error)
    }
  }

  const signInHandler = () => {
    setSignIn(!signIn)
  }
  return (
    <AuthContext.Provider
      value={{
        signIn,
        dataBase,
        signInHandler,
        getDB,
        insertData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}