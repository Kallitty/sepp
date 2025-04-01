import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import './sidebar.scss'
import {
  BiBookAlt,
  BiHome,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiFolder,
  BiTask,
  BiLogOut,
  BiMenu,
  BiX,
} from 'react-icons/bi'
import { DiAptana } from 'react-icons/di'

function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const sidebarRef = useRef(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const logoutSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`/logout`)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_username')
          swal('Logged out.', res.data.message, 'success')
          window.location.href = '/home'
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 419) {
          swal(
            'Session Expired',
            'Your session has expired. Please log in again.',
            'error'
          ).then(() => {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_username')
            window.location.href = '/home'
          })
        } else {
          swal(
            'Error',
            'An error occurred during logout. Please try again.',
            'error'
          )
        }
      })
  }

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className='sepp__mobile-menu-button' onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <BiX /> : <BiMenu />}
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && <div className='sepp__sidebar-overlay'></div>}

      <div
        ref={sidebarRef}
        className={`sepp__sidebar-grand ${
          isMobileMenuOpen ? 'mobile-menu-open' : ''
        }`}
      >
        <div className='sepp__sidebar-left__menu'>
          <div className='sepp__sidebar-left-menu--logo'>
            <BiBookAlt className='sepp__sidebar-left__logo-icon' />
            <h3>My SEPP</h3>
          </div>

          <div className='sepp__sidebar-left-menu--list'>
            <Link
              to='/boardoutlet'
              className='sepp__sidebar-left__items'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BiHome className='sepp__sidebar-left__icon' />
              Dashboard
            </Link>
            <Link
              to='/boardoutlet/result'
              className='sepp__sidebar-left__items'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BiSolidReport className='sepp__sidebar-left__icon' />
              Results
            </Link>
            <Link
              to='/boardoutlet/reportcard'
              className='sepp__sidebar-left__items'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BiFolder className='sepp__sidebar-left__icon' />
              Report card
            </Link>
            <Link
              to='/boardoutlet/stats'
              className='sepp__sidebar-left__items'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BiStats className='sepp__sidebar-left__icon' />
              Stats
            </Link>
            <Link
              to='/boardoutlet/message'
              className='sepp__sidebar-left__items'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BiMessage className='sepp__sidebar-left__icon' />
              Message
            </Link>
            <Link
              to='/boardoutlet/help'
              className='sepp__sidebar-left__items'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BiTask className='sepp__sidebar-left__icon' />
              Help
            </Link>
            <Link
              to='/boardoutlet/settings'
              className='sepp__sidebar-left__items'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <DiAptana className='sepp__sidebar-left__icon' />
              Settings
            </Link>
          </div>
        </div>
        <a
          href='#'
          className='sepp__sidebar-left__logout'
          onClick={(e) => {
            logoutSubmit(e)
            setIsMobileMenuOpen(false)
          }}
        >
          <BiLogOut className='sepp__sidebar-left__logouticon' />
          Logout
        </a>
      </div>
    </>
  )
}

export default Sidebar
