import { useContext } from 'react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { ApiContext } from '../contexts/ApiContext'
import { ThemeContext } from '../contexts/ThemeContext'

export const BtnHome = () => {
  const { darkMode } = useContext(ThemeContext)
  const { isScrolled, toHomeHandler } = useContext(ApiContext)
  return (
    <div className='absolute top-4 left-2'>
      <button onClick={toHomeHandler} className={`${isScrolled} ${darkMode ? '' : 'text-neutral-100 bg-red-700 border-2 border-neutral-700'} bg-slate-500 fixed z-20 rounded-full`}><Link to='/'><HiHome className='p-2 w-10 h-10'/></Link></button>
    </div>
  )
}