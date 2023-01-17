import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const SignInForm = () => {
  const { 
    onSubmitSignInHandler, 
    onChangeUserHandler, 
    onChangePassHandler, 
    signUpHandler, 
    error } = useContext(AuthContext)
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>Iniciar Sesión</h1>
      <div className='flex items-center p-2 justify-center w-3/4 bg-black text-white border-4 border-slate-400 rounded-lg'>
        <form className='flex flex-col gap-2 items-center justify-center' onSubmit={onSubmitSignInHandler}>
          <label htmlFor='userName'>Ingrese su email</label>
          <input className='rounded-lg p-1' type='email' name='userName' id='userName' onChange={onChangeUserHandler}/>
          <label htmlFor='password'>Ingrese su contraseña</label>
          <input className='rounded-lg p-1' type='password' name='password' id='password' onChange={onChangePassHandler} />
          {error && <ul className='text-red-600'><li>{error}</li></ul>}
          <button type="submit">Iniciar sesión</button>
          <button onClick={signUpHandler}>Registrarse</button>
        </form>
      </div>
    </div>
  )
}