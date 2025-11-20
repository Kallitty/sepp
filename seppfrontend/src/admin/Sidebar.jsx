import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Sidebar = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user')
        setUser(res.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <nav className='sb-sidenav accordion sb-sidenav-dark' id='sidenavAccordion'>
      <div className='sb-sidenav-menu'>
        <div className='nav'>
          <div className='sb-sidenav-menu-heading'>Core</div>
          <Link className='nav-link' to='/admin/dashboard'>
            <div className='sb-nav-link-icon'>
              <i className='fas fa-tachometer-alt'></i>
            </div>
            Dashboard
          </Link>
          <Link className='nav-link' to='/admin/profile'>
            <div className='sb-nav-link-icon'>
              <i className='fas fa-user'></i>
            </div>
            Profile
          </Link>
          <Link className='nav-link' to='/admin/create-quiz'>
            <div className='sb-nav-link-icon'>
              <i className='fas fa-user'></i>
            </div>
            Create Quiz
          </Link>
          <Link className='nav-link' to='/admin/update-quiz'>
            <div className='sb-nav-link-icon'>
              <i className='fas fa-user'></i>
            </div>
            Update Quiz
          </Link>
          <div className='sb-sidenav-menu-heading'>Interface</div>
          {/* User Details Collapse */}
          <Link
            className='nav-link collapsed'
            to='#'
            data-bs-toggle='collapse'
            data-bs-target='#collapseUserDetails'
            aria-expanded='false'
            aria-controls='collapseUserDetails'
          >
            <div className='sb-nav-link-icon'>
              <i className='fas fa-columns'></i>
            </div>
            User Details
            <div className='sb-sidenav-collapse-arrow'>
              <i className='fas fa-angle-down'></i>
            </div>
          </Link>
          <div
            className='collapse'
            id='collapseUserDetails'
            aria-labelledby='headingOne'
            data-bs-parent='#sidenavAccordion'
          >
            <nav className='sb-sidenav-menu-nested nav'>
              <Link className='nav-link' to='/admin/allresult'>
                All Scores
              </Link>
              <Link className='nav-link' to='/admin/visitortab'>
                Visitors
              </Link>
              <Link className='nav-link' to='/admin/user-activities'>
                Users Activity
              </Link>
            </nav>
          </div>
          {/* Messaging Collapse */}
          <Link
            className='nav-link collapsed'
            to='#'
            data-bs-toggle='collapse'
            data-bs-target='#collapseMessaging'
            aria-expanded='false'
            aria-controls='collapseMessaging'
          >
            <div className='sb-nav-link-icon'>
              <i className='fas fa-envelope'></i>
            </div>
            Contenting
            <div className='sb-sidenav-collapse-arrow'>
              <i className='fas fa-angle-down'></i>
            </div>
          </Link>
          <div
            className='collapse'
            id='collapseMessaging'
            aria-labelledby='headingOne'
            data-bs-parent='#sidenavAccordion'
          >
            <nav className='sb-sidenav-menu-nested nav'>
              <Link className='nav-link' to='/admin/messagecenter'>
                Message Center
              </Link>
              <Link className='nav-link' to='/admin/blog'>
                Blogging
              </Link>
              <Link className='nav-link' to='/admin/contact-messages'>
                Customer Messages
              </Link>
            </nav>
          </div>
          {/* Pages Collapse */}
          <Link
            className='nav-link collapsed'
            to='#'
            data-bs-toggle='collapse'
            data-bs-target='#collapsePages'
            aria-expanded='false'
            aria-controls='collapsePages'
          >
            <div className='sb-nav-link-icon'>
              <i className='fas fa-book-open'></i>
            </div>
            Pages
            <div className='sb-sidenav-collapse-arrow'>
              <i className='fas fa-angle-down'></i>
            </div>
          </Link>
          <div
            className='collapse'
            id='collapsePages'
            aria-labelledby='headingTwo'
            data-bs-parent='#sidenavAccordion'
          >
            <nav
              className='sb-sidenav-menu-nested nav accordion'
              id='sidenavAccordionPages'
            >
              <Link
                className='nav-link collapsed'
                to='#'
                data-bs-toggle='collapse'
                data-bs-target='#pagesCollapseAuth'
                aria-expanded='false'
                aria-controls='pagesCollapseAuth'
              >
                Authentication
                <div className='sb-sidenav-collapse-arrow'>
                  <i className='fas fa-angle-down'></i>
                </div>
              </Link>
              <div
                className='collapse'
                id='pagesCollapseAuth'
                aria-labelledby='headingOne'
                data-bs-parent='#sidenavAccordionPages'
              >
                <nav className='sb-sidenav-menu-nested nav'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                  <Link className='nav-link' to='/register'>
                    Register
                  </Link>
                  <Link className='nav-link' to='/forgot-password'>
                    Forgot Password
                  </Link>
                </nav>
              </div>

              <Link
                className='nav-link collapsed'
                to='#'
                data-bs-toggle='collapse'
                data-bs-target='#pagesCollapseError'
                aria-expanded='false'
                aria-controls='pagesCollapseError'
              >
                Error
                <div className='sb-sidenav-collapse-arrow'>
                  <i className='fas fa-angle-down'></i>
                </div>
              </Link>
              <div
                className='collapse'
                id='pagesCollapseError'
                aria-labelledby='headingOne'
                data-bs-parent='#sidenavAccordionPages'
              >
                <nav className='sb-sidenav-menu-nested nav'>
                  <Link className='nav-link' to='/401'>
                    401 Page
                  </Link>
                  <Link className='nav-link' to='/404'>
                    404 Page
                  </Link>
                  <Link className='nav-link' to='/500'>
                    500 Page
                  </Link>
                </nav>
              </div>
            </nav>
          </div>
          <div className='sb-sidenav-menu-heading'>Addons</div>
          <Link className='nav-link' to='/admin/charts'>
            <div className='sb-nav-link-icon'>
              <i className='fas fa-chart-area'></i>
            </div>
            Charts
          </Link>
          <Link className='nav-link' to='/admin/tables'>
            <div className='sb-nav-link-icon'>
              <i className='fas fa-table'></i>
            </div>
            Tables
          </Link>
        </div>
      </div>

      <div className='sb-sidenav-footer'>
        <div className='small'>Logged in as:</div>
        {loading
          ? 'Loading...'
          : user?.role_as === 1
          ? 'Administrator'
          : user?.name || 'Contributor'}
      </div>
    </nav>
  )
}

export default Sidebar
