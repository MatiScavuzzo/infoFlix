import { Outlet } from 'react-router-dom'
import { NavbarContainer } from '../containers/NavbarContainer'


export const LayoutPublic = () => {
  return (
    <div>
      <NavbarContainer />
      <Outlet />
    </div>
  )
}