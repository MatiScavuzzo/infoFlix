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
  const [userAccount, setUserAccount] = useState()
  const [accountId, setAccountId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [validUsername, setValidUsername] = useState(false)

  const onChangeUserNameHandler = (ev) => {
    if (ev.target.value.length === 10 && /[A-Z]/.test(ev.target.value)) {
      setValidUsername(true)
      setUserName(ev.target.value)
    } else {
      setValidUsername(false)
    }
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
    if (data) {
      setUserAccount(data)
    }
    if (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    if (validUsername === true) {
      getUserDB(userName)
    }
  }, [validUsername])

  useEffect(() => {
    if (userAccount !== undefined) {
      if (userAccount[0].password === password) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }
  }, [password, userAccount])

  const logInHandler = () => {
    if (!isLoggedIn) {
      alert('Verifique los datos ingresados')
    } else {
      setAccessToken(userAccount[0].access_token)
      setAccountId(userAccount[0].account_id)
    }
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
        validUsername,
        accountId,
        accessToken,
        isLoggedIn,
        logInHandler,
        setAccessToken,
        setSignIn,
        setAccountId,
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