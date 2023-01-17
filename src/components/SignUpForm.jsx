import { useContext } from 'react'
import classNames from 'classnames'
import { InfoPass } from './InfoPass'
import { AuthContext } from '../contexts/AuthContext'

const classModalOpen = classNames('absolute top-6 rounded-xl p-4 -inset-x-36 w-80 bg-black border-4 border-slate-400 opacity-80 flex flex-col gap-1')

export const SignUpForm = () => {
  const { 
    onSubmitSignUpHandler,
    onChangeUserHandler, 
    onChangePassHandler,
    onChangeRepeatPassHandler,
    password,
    repPassword, 
    openModal, 
    showModal,
    signInHandler, 
    closeModal, 
    error } = useContext(AuthContext)
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>Registrarse</h1>
      <div className='flex items-center p-2 justify-center w-3/4 bg-black text-white border-4 border-slate-400 rounded-lg'>
        <form className='flex flex-col gap-2 items-center justify-center' onSubmit={onSubmitSignUpHandler}>
          <label htmlFor='userName'>Ingrese su email</label>
          <input className='rounded-lg p-1' type='email' name='userName' id='userName' onChange={onChangeUserHandler}/>
          <label htmlFor='password'>Ingrese su contraseña</label>
          <input className='rounded-lg p-1' type='password' name='password' id='password' onChange={onChangePassHandler} />
          <label htmlFor='password'>Repita su contraseña</label>
          <input className={`${repPassword === password ? ' text-green-400' : 'text-red-600' } rounded-lg p-1`} type='password' name='password' id='password' onChange={onChangeRepeatPassHandler} />
          <button className='relative underline' onClick={openModal}>Info
            <InfoPass className={`${showModal === true ? classModalOpen : 'hidden'}`} onClose={closeModal} />
          </button>
          {error && <ul className='text-red-600'><li>{error}</li></ul>}
          <button type="submit">Registrarse</button>
          <button onClick={signInHandler}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  )
}