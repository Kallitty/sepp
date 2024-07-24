import React from 'react'
import { Outlet } from 'react-router-dom'

import '../assets/admin/js/scripts'
import '../assets/admin/css/styles.css'
import './masterlayout.scss' // Import admin-specific styles

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const MasterLayout = () => {
  return (
    <div className='admin-container'>
      <div className='sb-nav-fixed'>
        <Navbar />
        <div id='layoutSidenav'>
          <div id='layoutSidenav_nav'>
            <Sidebar />
          </div>
          <div id='layoutSidenav_content'>
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MasterLayout
