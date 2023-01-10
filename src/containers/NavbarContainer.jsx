import React from 'react'
import { Navbar } from '../components/Navbar.jsx'

export const NavbarContainer = ({className}) => {
  return (
    <header className={className}>
      <Navbar className='flex text-neutral-100 items-center p-2 justify-between relative lg:justify-center bg-gradient-to-b from-black to-slate-700 gap-2' />
    </header>
  )
}