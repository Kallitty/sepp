import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Navbar() {
  const logoutSubmit = (e) => {
    e.preventDefault()

    swal({
      title: 'Are you sure you want to log out?',
      text: 'You are logging out of admin panel.',
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancel',
          value: null,
          visible: true,
        },
        confirm: {
          text: 'Yes',
          value: true,
          visible: true,
        },
      },
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
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
    })
  }
  return (
    <nav className='sb-topnav navbar navbar-expand navbar-dark bg-dark !important'>
      <Link to='/admin/dashboard' className='navbar-brand ps-3'>
        Sir Admin
      </Link>

      <button
        className='btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0'
        id='sidebarToggle'
        to='#!'
      >
        <i className='fas fa-bars'></i>
      </button>

      <form className='d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0'>
        <div className='input-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Search for...'
            aria-label='Search for...'
            aria-describedby='btnNavbarSearch'
          />
          <button
            className='btn btn-primary'
            id='btnNavbarSearch'
            type='button'
          >
            <i className='fas fa-search'></i>
          </button>
        </div>
      </form>

      <ul className='navbar-nav ms-auto ms-md-0 me-3 me-lg-4'>
        <li className='nav-item dropdown'>
          <Link
            to='#'
            className='nav-link dropdown-toggle'
            id='navbarDropdown'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <i className='fas fa-user fa-fw'></i>
          </Link>
          <ul
            className='dropdown-menu dropdown-menu-end'
            aria-labelledby='navbarDropdown'
          >
            <li>
              <Link to='#!' className='dropdown-item'>
                Settings
              </Link>
            </li>
            <li>
              <Link to='/boardoutlet' className='dropdown-item'>
                Exam Dashboard
              </Link>
            </li>
            <li>
              <hr className='dropdown-divider' />
            </li>
            <li>
              <Link to='#' className='dropdown-item' onClick={logoutSubmit}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
