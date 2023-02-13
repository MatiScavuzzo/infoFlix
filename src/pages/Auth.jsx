import { useContext } from 'react'
import { LogInForm } from '../components/LogInForm'
import { SignInForm } from '../components/SignInForm'
import { ApiContext } from '../contexts/ApiContext'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

export const Auth = () => {
  const { signIn, logInHandler, isLoggedIn } = useContext(AuthContext)
  const { onSubmitGetAccountIdHandler } = useContext(ApiContext)
  const { darkMode } = useContext(ThemeContext)
  return (
    <div className={`${darkMode ? 'dark' : 'light'} flex items-start justify-center p-4 h-screen`}>
      <div className='border-4 border-slate-400 w-1/2 p-4 rounded-lg'>
        {signIn ? <SignInForm onClick={onSubmitGetAccountIdHandler} /> : <LogInForm isLoggedInTo={isLoggedIn ? '/home' : '/auth'} onClick={logInHandler} />}
      </div>
    </div>
  )
}