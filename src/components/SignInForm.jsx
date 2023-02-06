import { useContext } from 'react'
import { ApiContext } from '../contexts/ApiContext'

export const SignInForm = ({ onSubmit }) => {
  const { onChangeUserNameHandler, onChangePasswordHandler, getAccountIdHandler, accountId } = useContext(ApiContext)
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4' method='post'>
      <label htmlFor='userName'>Usuario</label>
      <input onChange={onChangeUserNameHandler} type='text' name='userName' id='userName' />
      <label htmlFor='password'>Contraseña</label>
      <input onChange={onChangePasswordHandler} type='password' name='password' id='password' />
      <button className={`${accountId === '' ? 'flex' : 'hidden'}`} onClick={getAccountIdHandler}>Generar ID</button>
      <button className={`${accountId !== '' ? 'flex' : 'hidden'}`} type='submit'>Enviar</button>
    </form>
  )
}