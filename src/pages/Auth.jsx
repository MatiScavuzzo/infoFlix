import { useContext } from 'react'
import { ApiContext } from '../contexts/ApiContext'
import { InfoPass } from '../components/InfoPass'
import classNames from 'classnames'

const classModalOpen = classNames('absolute top-6 rounded-xl p-4 -inset-x-36 w-80 bg-black border-4 border-slate-400 opacity-80 flex flex-col gap-1')

export const Auth = () => {
  const {onChangeUserHandler, onSubmitLogInHandler,onChangePassHandler, error, openModal, closeModal, showModal} = useContext(ApiContext)
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>Iniciar Sesión</h1>
      <div className='flex items-center p-2 justify-center w-3/4 bg-black text-white border-4 border-slate-400 rounded-lg'>
        <form className='flex flex-col gap-2 items-center justify-center' onSubmit={onSubmitLogInHandler}>
          <label htmlFor='userName'>Ingrese su email</label>
          <input className='rounded-lg p-1' type='email' name='userName' id='userName' onChange={onChangeUserHandler}/>
          <label htmlFor='password'>Ingrese su contraseña</label>
          <input className='rounded-lg p-1' type='password' name='password' id='password' onChange={onChangePassHandler} />
          <button className='relative underline' onClick={openModal}>Info
            <InfoPass className={`${showModal === true ? classModalOpen : 'hidden'}`} onClose={closeModal} />
          </button>
          {error && <ul className='text-red-600'><li>{error}</li></ul>}
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  )
}