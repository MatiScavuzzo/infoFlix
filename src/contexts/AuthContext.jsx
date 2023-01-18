import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const AuthContext = React.createContext()

export const AuthContextProvider = ( { children } ) => {
  const API_KEY = 'api_key=ec755b7b2f3cf064edd7cd1219ddcf08'
  const API_URL = 'https://api.themoviedb.org/3/'
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [repPassword, setRepPassword] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)
  const [signInForm, setSignInForm] = useState(true)
  const [requestTokenApi, setRequestTokenApi] = useState('')
  const [isLogIn, setIsLogIn] = useState(false)
  const API_REQUEST_TOKEN = `https://www.themoviedb.org/authenticate/${requestTokenApi}?redirect_to=http://localhost:8080`

  const auth = getAuth()
  const userLogged = auth.currentUser

  

  const alertHandler = () => {
    if (isLogIn === false) {
      alert('Deberás registrarte o iniciar sesión para continuar')
    }
  }
  const signUpHandler = () => {
    setSignUpForm(true)
    setSignInForm(false)
  }
  const signInHandler = () => {
    setSignUpForm(false)
    setSignInForm(true)
  }
  const openModal = () => {
    setShowModal(!showModal)
  }
  const closeModal = () => {
    setShowModal(!showModal)
  }
  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return "El correo electrónico no es válido";
    }
    return "";
  }
  const validatePassword = (password) => {
    // Comprobar que la contraseña cumple con ciertas reglas de seguridad
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/\d/.test(password)) {
        return "La contraseña debe tener al menos un número";
    }
    if (!/[a-z]/.test(password)) {
        return "La contraseña debe tener al menos una letra minúscula";
    }
    if (!/[A-Z]/.test(password)) {
        return "La contraseña debe tener al menos una letra mayúscula";
    }
    return "";
  }
  const onChangePassHandler = (ev) => {
    let pass = ev.target.value
    setPassword(pass)
  }
  const onChangeRepeatPassHandler = (ev) => {
    let repPass = ev.target.value
    setRepPassword(repPass)
  }
  const onChangeUserHandler = (ev) => {
    let userName = ev.target.value
    setUser(userName);
  }
  const onSubmitSignUpHandler = (ev) => {
    ev.preventDefault()
    const userError = validateEmail(user)
    const passwordError = validatePassword(password)
    if (userError || passwordError) {
      setError(userError || passwordError)
      return
    }
    setError('')
    createUserWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      const userName = userCredential.userName
      setIsLogIn(true)
      fetch(`${API_URL}authentication/token/new?${API_KEY}`)
      .then(res => res.json())
      .then(resRequestToken => setRequestTokenApi(resRequestToken.request_token))
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error);
    })  
  }
  const onSubmitSignInHandler = (ev) => {
    ev.preventDefault()
    const userError = validateEmail(user)
    if (userError) {
      setError(userError)
      return
    }
    setError('')
    signInWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      const userName = userCredential.userName
      setIsLogIn(true)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorMessage)
    })
  }
  const logOutHandler = () => {
    signOut(auth)
    .then(() => {
      alert('Vuelvas prontos!')
      setIsLogIn(false)
    })
    .catch((error) => {
      alert('Mmm... algo falló!')
    })
  }
  return (
    <AuthContext.Provider
      value={{
        password,
        repPassword,
        error,
        showModal,
        signUpForm,
        requestTokenApi,
        isLogIn,
        API_REQUEST_TOKEN,
        alertHandler,
        signUpHandler,
        signInHandler,
        openModal,
        closeModal,
        onChangePassHandler,
        onChangeRepeatPassHandler,
        onChangeUserHandler,
        onSubmitSignUpHandler,
        onSubmitSignInHandler,
        logOutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}