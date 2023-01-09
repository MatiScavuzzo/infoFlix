import { useContext } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { ApiContext } from '../contexts/ApiContext'

export const BtnMenuMovil = ({ onClick, className }) => {
  const {isOpen} = useContext(ApiContext)
  return (
    <button className={className} onClick={onClick}>{isOpen === false ? <HiOutlineMenu className='w-10 h-10' /> : <HiOutlineX className='w-10 h-10' />}</button>
  )
}