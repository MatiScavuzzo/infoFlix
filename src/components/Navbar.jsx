import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export const Navbar = ({className}) => (
    <nav className={className}>
      <Link to='/'className='w-3/5' ><Logo className='w-full p-2' /></Link>
      <ul className='w-4/5 flex items-center justify-around'>
        <Link to='/movies'><li className='font-black active:underline'>Peliculas</li></Link>
        <Link to='/series'><li className='font-black active:underline'>Series</li></Link>
        <Link to= '/trending'><li className='font-black active:underline'>Destacados</li></Link>
      </ul>
    </nav>
  )