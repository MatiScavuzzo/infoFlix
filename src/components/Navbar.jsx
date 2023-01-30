import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ApiContext } from '../contexts/ApiContext'
import { BtnMenuMovil } from './BtnMenuMovil'
import { Logo } from './Logo'
import { HiOutlineArrowTrendingUp, HiOutlineFilm, HiOutlineSparkles } from 'react-icons/hi2'
import { BtnTheme } from './BtnTheme'

export const Navbar = ({className}) => {
  const { 
    isOpen, 
    tabHandler, 
    selectedTabFilm, 
    toHomeHandler, 
    selectedTabSeries, 
    selectedTabTrending, 
    isOpenHandler } = useContext(ApiContext)
  return (
    <nav className={className}>
      <Link to='/'className='w-3/5' ><button onClick={toHomeHandler} className='w-full'><Logo className='w-full lg:w-5/6 p-2' /></button></Link>
      <div className='flex lg:flex-col lg:justify-between p-2 items-center justify-end gap-2 lg:items-center w-3/5'>
        <BtnTheme className='border lg:w-4/5 w-1/5 flex items-center justify-center rounded-lg border-slate-300 border-opacity-40 p-2' />
        <BtnMenuMovil className='flex lg:hidden items-center justify-center' onClick={isOpenHandler} />
        <ul className={`${isOpen === false ? 'hidden lg:flex' : 'absolute flex flex-col md:top-36 top-20 items-end justify-around right-4 h-auto p-4 bg-black border-4 border-red-600 border-opacity-30 opacity-80 z-10 rounded-lg'} border border-slate-300 border-opacity-40 lg:rounded-lg p-2 lg:w-4/5 lg:items-center lg:justify-around`}>
          <Link to='/movies'><li className='font-black p-1 flex'><button value='films' onClick={tabHandler} className={`${selectedTabFilm} flex justify-center items-center gap-2`}>Peliculas <HiOutlineFilm className={`underline w-6 h-6`} /></button></li></Link>
          <Link to='/series'><li className='font-black p-1 flex'><button value='series' onClick={tabHandler} className={`${selectedTabSeries} flex justify-center items-center gap-2`}>Series <HiOutlineSparkles className='w-6 h-6' /></button></li></Link>
          <Link to= '/trending'><li className='font-black p-1 flex'><button value='trending' onClick={tabHandler} className={`${selectedTabTrending} flex justify-center items-center gap-2`}>Destacados <HiOutlineArrowTrendingUp className='w-6 h-6' /></button></li></Link>
        </ul>
      </div> 
    </nav>
  )
}