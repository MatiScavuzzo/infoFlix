import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const LogInForm = ({ onClick }) => {
  const { onChangeUserNameHandler, onChangePasswordHandler } = useContext(AuthContext)
  return (
    <div className='flex flex-col items-center gap-4' method='post'>
      <label htmlFor='userName'>Usuario</label>
      <input className='w-2/3 rounded-lg border border-slate-500' onChange={onChangeUserNameHandler} type='text' name='userName' id='userName' />
      <label htmlFor='password'>Contraseña</label>
      <input className='w-2/3 rounded-lg border border-slate-500' onChange={onChangePasswordHandler} type='password' name='password' id='password' />
      <button className='bg-slate-600 text-white font-bold p-2 rounded-lg border border-slate-300' onClick={onClick}type='submit'>Iniciar sesión</button>
    </div>
  )
}