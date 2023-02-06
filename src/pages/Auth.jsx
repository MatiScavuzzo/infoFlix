import { useContext } from 'react'
import { SignInForm } from '../components/SignInForm'
import { ApiContext } from '../contexts/ApiContext'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

export const Auth = () => {
  const { signIn, signInHandler } = useContext(AuthContext)
  const { onSubmitGetAccountIdHandler } = useContext(ApiContext)
  const { darkMode } = useContext(ThemeContext)
  return (
    <div className={`${darkMode ? 'dark' : 'light'}`}>
      <div className='border-4 border-slate-400 p-2'>
        <SignInForm onClick={onSubmitGetAccountIdHandler} />
      </div>
    </div>
  )
}