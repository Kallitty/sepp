// Navbar.jsx
import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '../../assets/cutoutworld.png'
import { Link } from 'react-router-dom'

const Menu = () => (
  <>
    <p>
      <a href='/home'> Home </a>
    </p>
    <p>
      <a href='wsepp'> About SEPP </a>
    </p>
    <p>
      <Link to='/library'> Library</Link>
    </p>
    <p>
      <Link to='/contactus'> Contact Us </Link>
    </p>
    <p>
      <Link to='/donations'> Donations </Link>
    </p>
    <p>
      <Link to='/login'> Take Exam </Link>
    </p>
  </>
)

const Navbar = ({ hideAuth }) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className='sepp__navbar'>
      <div className='sepp__navbar-links'>
        <Link to='/' className='sepp__navbar-links_logo'>
          <img src={logo} alt='logo' />
        </Link>
        <div className='sepp__navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className='sepp__navbar-sign'>
        {!hideAuth && (
          // <>
          //   <p>Login</p>
          //   <button type='button'>Sign up</button>
          // </>
          <>
            <p>
              <Link to='/login'>Login</Link>
            </p>
            <button
              type='button'
              onClick={() => (window.location.href = '/register')}
            >
              Sign up
            </button>
          </>
        )}
      </div>
      <div className='sepp__navbar-menu'>
        {toggleMenu ? (
          <RiCloseLine
            color='#fff'
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color='#fff'
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}

        {toggleMenu && (
          <div className='sepp__navbar-menu_container scale-up-center'>
            <div className='sepp__navbar-menu_container-links'>
              <Menu />
              <div className='sepp__navbar-menu_container-links-sign'>
                {!hideAuth && (
                  <>
                    <p>
                      <Link to='/login'>Login</Link>
                    </p>
                    <button
                      type='button'
                      onClick={() => (window.location.href = '/register')}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
