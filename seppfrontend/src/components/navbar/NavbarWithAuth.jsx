import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'

const NavbarWithAuth = () => {
  const location = useLocation()

  const hideAuthPaths = ['/library', '/wsepp', '/login']

  // Checks if the current location is in the array of paths where auth buttons should be hidden
  const shouldHideAuth = hideAuthPaths.includes(location.pathname)

  return <Navbar hideAuth={shouldHideAuth} />
}

export default NavbarWithAuth
