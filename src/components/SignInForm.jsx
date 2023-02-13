import { useContext } from 'react'
import { ApiContext } from '../contexts/ApiContext'
import { AuthContext } from '../contexts/AuthContext'

export const SignInForm = ({ onClick }) => {
  const { getAccountIdHandler } = useContext(ApiContext)
  const { onChangeUserNameHandler, onChangePasswordHandler, accountId } =useContext(AuthContext)
  return (
    <div className='flex flex-col items-center gap-4'>
      <label htmlFor='userName'>Usuario</label>
      <input className='w-2/3 rounded-lg' onChange={onChangeUserNameHandler} type='text' maxLength={10} name='userName' id='userName' />
      <h5 className='text-white'>El nombre de usuario debe tener 10 caracteres y al menos una mayúscula</h5>
      <label htmlFor='password'>Contraseña</label>
      <input className='w-2/3 rounded-lg' onChange={onChangePasswordHandler} type='password' name='password' id='password' />
      <button className={`${accountId === '' ? 'flex' : 'hidden'} bg-slate-600 text-white font-bold p-2 rounded-lg border border-slate-300`} onClick={getAccountIdHandler}>Generar ID</button>
      <button className={`${accountId !== '' ? 'flex' : 'hidden'} bg-slate-600 text-white font-bold p-2 rounded-lg border border-slate-300`} onClick={onClick}type='submit'>Enviar</button>
    </div>
  )
}