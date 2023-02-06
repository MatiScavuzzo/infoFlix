import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

export const Auth = () => {
  const { signIn, signInHandler } = useContext(AuthContext)
  const { darkMode } = useContext(ThemeContext)
  return (
    <div className={`${darkMode ? 'dark' : 'light'}`}>
      <div className='border-4 border-slate-400 p-2'>
        
      </div>
    </div>
  )
}