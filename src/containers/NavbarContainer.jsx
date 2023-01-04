import React from 'react'
import { Navbar } from '../components/Navbar.jsx'

export const NavbarContainer = ({className}) => (
    <header className={className}>
      <Navbar className='flex items-center p-2 h-36 justify-center bg-gradient-to-b from-black to-slate-700' />
    </header>
  )
