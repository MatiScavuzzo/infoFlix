import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const LogInForm = ({ onClick, isLoggedInTo }) => {
  const { onChangeUserNameHandler, onChangePasswordHandler, validUsername } = useContext(AuthContext)
  return (
    <div className='flex flex-col items-center gap-4' method='post'>
      <label htmlFor='userName'>Usuario</label>
      <input className='w-2/3 rounded-lg border border-slate-500' onChange={onChangeUserNameHandler} type='text' maxLength={10} name='userName' id='userName' />
      <h5 className={`${!validUsername ? 'block' : 'hidden'} text-red-600`}>El nombre de usuario debe tener 10 caracteres y al menos una mayúscula</h5>
      <label htmlFor='password'>Contraseña</label>
      <input className='w-2/3 rounded-lg border border-slate-500' onChange={onChangePasswordHandler} type='password' name='password' id='password' />
      <button className='bg-slate-600 text-white font-bold p-2 rounded-lg border border-slate-300' onClick={onClick}type='submit'><Link to={isLoggedInTo}>Iniciar Sesión</Link></button>
    </div>
  )
}