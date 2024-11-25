import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import MasterLayout from '../admin/MasterLayout'
import { ClipLoader } from 'react-spinners'

function AdminPrivateRoute({ children }) {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        const authRes = await axios.get('/checkingAuthenticated')
        if (authRes.data.status === 200) {
          setIsAuthenticated(true)
          const userRes = await axios.get('/user')
          if (userRes.data.role_as === 1) {
            setIsAdmin(true)
          } else {
            setError('User is not an admin.')
          }
        } else {
          setError('User is not authenticated.')
        }
      } catch (err) {
        console.error(err)
        setError('An error occurred while checking authentication.')
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndRole()

    return () => {
      setIsAuthenticated(false)
      setIsAdmin(false)
      setError(null)
    }
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

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          color: 'red',
        }}
      >
        <h1>{error}</h1>
        <Navigate to='/login' state={{ from: location }} />
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return (
    <MasterLayout
      className='admin-container'
      rel='stylesheet'
      href='bootstrap/dist/css/bootstrap.min.css'
    >
      {children}
    </MasterLayout>
  )
}

export default AdminPrivateRoute
