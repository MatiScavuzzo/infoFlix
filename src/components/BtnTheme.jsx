import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

export const BtnTheme = ( { className } ) => {
  const { toggleDarkMode, darkMode } = useContext(ThemeContext)
  return (
    <button className={className} onClick={toggleDarkMode}>{darkMode ? <MdOutlineDarkMode className='w-6 h-6' /> : <MdOutlineLightMode className='w-6 h-6' />}</button>
  )
}