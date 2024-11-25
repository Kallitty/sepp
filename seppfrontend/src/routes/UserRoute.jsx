import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

const UserRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/checkingAuthenticated')
        if (res.data.status === 200) {
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default UserRoute
