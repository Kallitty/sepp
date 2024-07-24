import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to='/boardoutlet' /> : <Outlet />
}

export default PublicRoute
