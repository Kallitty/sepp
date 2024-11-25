import React from 'react'
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
} from 'react-icons/bi'
import { DiAptana } from 'react-icons/di'

function Sidebar() {
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
    <div className='sepp__sidebar-grand'>
      <div className='sepp__sidebar-left__menu'>
        <div className='sepp__sidebar-left-menu--logo'>
          <BiBookAlt className='sepp__sidebar-left__logo-icon' />
          <h3>My SEPP</h3>
        </div>

        <div className='sepp__sidebar-left-menu--list'>
          <Link to='/boardoutlet' className='sepp__sidebar-left__items'>
            <BiHome className='sepp__sidebar-left__icon' />
            Dashboard
          </Link>
          <Link to='/boardoutlet/result' className='sepp__sidebar-left__items'>
            <BiSolidReport className='sepp__sidebar-left__icon' />
            Results
          </Link>
          <Link to='#' className='sepp__sidebar-left__items'>
            <BiFolder className='sepp__sidebar-left__icon' />
            Report card
          </Link>
          <Link to='#' className='sepp__sidebar-left__items'>
            <BiStats className='sepp__sidebar-left__icon' />
            Stats
          </Link>
          <Link to='#' className='sepp__sidebar-left__items'>
            <BiMessage className='sepp__sidebar-left__icon' />
            Message
          </Link>
          <Link to='#' className='sepp__sidebar-left__items'>
            <BiTask className='sepp__sidebar-left__icon' />
            Help
          </Link>
          <Link to='#' className='sepp__sidebar-left__items'>
            <DiAptana className='sepp__sidebar-left__icon' />
            Settings
          </Link>
        </div>
      </div>
      <a href='#' className='sepp__sidebar-left__logout' onClick={logoutSubmit}>
        <BiLogOut className='sepp__sidebar-left__logouticon' />
        Logout
      </a>
    </div>
  )
}

export default Sidebar
