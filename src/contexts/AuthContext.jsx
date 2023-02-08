import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext()

const SUPABASE_URL = "https://cdwbosztukeirqyteyss.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkd2Jvc3p0dWtlaXJxeXRleXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1NDg3MzMsImV4cCI6MTk5MTEyNDczM30.f7KEE3phpAGzcF5RjUjOQVIlvkdIB_I68YVIO_64Pj0"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export const AuthContextProvider = ( {children} ) => {
  const [dataBase, setDataBase] = useState([])
  const [signIn, setSignIn] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userAccount, setUserAccount] = useState([])
  const [accountId, setAccountId] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const onChangeUserNameHandler = (ev) => {
    setUserName(ev.target.value)
  }
  const onChangePasswordHandler = (ev) => {
    setPassword(ev.target.value)
  }
  const onSignInHandler = () => {
    setSignIn(true)
  }
  const onLogInHandler = () => {
    setSignIn(false)
  }

  const getDB = async () => {
    const { data: Account, error} = await supabase.from('Account').select()
    setDataBase(Account)
    if (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getDB()
  }, [])

  const getUserDB = async (username) => {
    const { data , error } = await supabase.from('Account').select().eq('username', username)
    console.log(data)
    if (error) {
      console.log(error)
    }
    return setUserAccount(data)
  }

  useEffect(() => {
    getUserDB(userName)
  }, [userName])

  useEffect(() => {
    console.log(userAccount)
  }, [userAccount])

  const logInHandler = () => {
    setIsLoggedIn(true)
  }

  const insertData = async (user) => {
    const {error} = await supabase.from('Account').insert(user)
    if (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        dataBase,
        userName,
        password,
        onChangePasswordHandler,
        onChangeUserNameHandler,
        onSignInHandler,
        onLogInHandler,
        getDB,
        insertData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}