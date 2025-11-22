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
  BiChevronDown,
  BiChevronUp,
} from 'react-icons/bi'
import { DiAptana } from 'react-icons/di'

function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isExamMenuOpen, setIsExamMenuOpen] = useState(false)
  const [isCertMenuOpen, setIsCertMenuOpen] = useState(false)
  const sidebarRef = useRef(null)
  const examMenuRef = useRef(null)
  const certMenuRef = useRef(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleExamMenu = () => {
    setIsExamMenuOpen(!isExamMenuOpen)
    setIsCertMenuOpen(false) // Close cert menu when opening exam menu
  }

  const toggleCertMenu = () => {
    setIsCertMenuOpen(!isCertMenuOpen)
    setIsExamMenuOpen(false) // Close exam menu when opening cert menu
  }

  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false)
  const helpMenuRef = useRef(null)

  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false)
  const settingsMenuRef = useRef(null)

  // Close sidebar and menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu if clicking outside sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target)) {
        setIsHelpMenuOpen(false)
      }
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target)
      ) {
        setIsSettingsMenuOpen(false)
      }

      // Close exam menu if clicking outside of it
      if (examMenuRef.current && !examMenuRef.current.contains(event.target)) {
        setIsExamMenuOpen(false)
      }

      // Close cert menu if clicking outside of it
      if (certMenuRef.current && !certMenuRef.current.contains(event.target)) {
        setIsCertMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close all menus when clicking on any sidebar item
  const handleSidebarItemClick = () => {
    setIsExamMenuOpen(false)
    setIsCertMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const logoutSubmit = (e) => {
    e.preventDefault()

    swal({
      title: 'Are you sure you want to log out?',
      text: 'You are logging out of your dashboard.',
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
    <>
      {/* Mobile Menu Button */}
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
              onClick={handleSidebarItemClick}
            >
              <BiHome className='sepp__sidebar-left__icon' />
              Dashboard
            </Link>
            {/* Exam Section - Dropdown */}
            <div className='sepp__sidebar-exam-section' ref={examMenuRef}>
              <div
                className='sepp__sidebar-exam-header'
                onClick={toggleExamMenu}
              >
                <BiBookAlt className='sepp__sidebar-left__icon' />
                <span>Exams</span>
                {isExamMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
              </div>

              {isExamMenuOpen && (
                <div className='sepp__sidebar-exam-subsections'>
                  <Link
                    to='/boardoutlet/exams/job'
                    className='sepp__sidebar-left__items sepp__sidebar-exam-item'
                    onClick={handleSidebarItemClick}
                  >
                    Job Exams
                  </Link>
                  <Link
                    to='/boardoutlet/exams/jamb'
                    className='sepp__sidebar-left__items sepp__sidebar-exam-item'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    JAMB
                  </Link>
                  <Link
                    to='/boardoutlet/exams/waec'
                    className='sepp__sidebar-left__items sepp__sidebar-exam-item'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    WAEC
                  </Link>
                  <Link
                    to='/boardoutlet/exams/neco'
                    className='sepp__sidebar-left__items sepp__sidebar-exam-item'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    NECO
                  </Link>
                  <Link
                    to='/boardoutlet/exams/nabteb'
                    className='sepp__sidebar-left__items sepp__sidebar-exam-item'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    NABTEB
                  </Link>
                </div>
              )}
            </div>
            <Link
              to='/boardoutlet/result'
              className='sepp__sidebar-left__items'
              onClick={handleSidebarItemClick}
            >
              <BiSolidReport className='sepp__sidebar-left__icon' />
              Results
            </Link>
            {/* Certification Section - Dropdown */}
            <div className='sepp__sidebar-cert-section' ref={certMenuRef}>
              <div
                className='sepp__sidebar-cert-header'
                onClick={toggleCertMenu}
              >
                <BiFolder className='sepp__sidebar-left__icon' />
                <span>Certs</span>
                {isCertMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
              </div>

              {isCertMenuOpen && (
                <div className='sepp__sidebar-cert-subsections'>
                  <Link
                    to='/boardoutlet/certification/certificates'
                    className='sepp__sidebar-left__items sepp__sidebar-cert-item'
                    onClick={handleSidebarItemClick}
                  >
                    Certificates
                  </Link>
                  <Link
                    to='/boardoutlet/certification/reportcard'
                    className='sepp__sidebar-left__items sepp__sidebar-cert-item'
                    onClick={handleSidebarItemClick}
                  >
                    Report Card
                  </Link>
                </div>
              )}
            </div>
            <Link
              to='/boardoutlet/message'
              className='sepp__sidebar-left__items'
              onClick={handleSidebarItemClick}
            >
              <BiMessage className='sepp__sidebar-left__icon' />
              Message
            </Link>
            {/* Help Section - Dropdown */}
            <div className='sepp__sidebar-help-section' ref={helpMenuRef}>
              <div
                className='sepp__sidebar-help-header'
                onClick={() => {
                  setIsHelpMenuOpen(!isHelpMenuOpen)
                  setIsExamMenuOpen(false)
                  setIsCertMenuOpen(false)
                }}
              >
                <BiTask className='sepp__sidebar-left__icon' />
                <span>Help</span>
                {isHelpMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
              </div>

              {isHelpMenuOpen && (
                <div className='sepp__sidebar-help-subsections'>
                  <Link
                    to='/boardoutlet/help/faq'
                    className='sepp__sidebar-left__items sepp__sidebar-help-item'
                    onClick={handleSidebarItemClick}
                  >
                    FAQ
                  </Link>

                  <Link
                    to='/boardoutlet/help/tutorials'
                    className='sepp__sidebar-left__items sepp__sidebar-help-item'
                    onClick={handleSidebarItemClick}
                  >
                    Tutorials
                  </Link>

                  <Link
                    to='/boardoutlet/help/contactsupport'
                    className='sepp__sidebar-left__items sepp__sidebar-help-item'
                    onClick={handleSidebarItemClick}
                  >
                    Contact Support
                  </Link>

                  <Link
                    to='/boardoutlet/help/reportissue'
                    className='sepp__sidebar-left__items sepp__sidebar-help-item'
                    onClick={handleSidebarItemClick}
                  >
                    Report Issue
                  </Link>
                </div>
              )}
            </div>

            {/* <Link
              to='/boardoutlet/settings'
              className='sepp__sidebar-left__items'
              onClick={handleSidebarItemClick}
            >
              <DiAptana className='sepp__sidebar-left__icon' />
              Settings
            </Link> */}
            {/* Settings Section-Dropdown */}
            <div
              className='sepp__sidebar-settings-section'
              ref={settingsMenuRef}
            >
              <div
                className='sepp__sidebar-settings-header'
                onClick={() => {
                  setIsSettingsMenuOpen(!isSettingMenuOpen)
                  setIsHelpMenuOpen(false)
                  setIsExamMenuOpen(false)
                  setIsCertMenuOpen(false)
                }}
              >
                <BiTask className='sepp__sidebar-left__icon' />
                <span>Settings</span>
                {isHelpMenuOpen ? <BiChevronUp /> : <BiChevronDown />}
              </div>

              {isHelpMenuOpen && (
                <div className='sepp__sidebar-settings-subsections'>
                  <Link
                    to='/boardoutlet/settings/accountsettings'
                    className='sepp__sidebar-left__items sepp__sidebar-settings-item'
                    onClick={handleSidebarItemClick}
                  >
                    Account Settings
                  </Link>

                  <Link
                    to='/boardoutlet/settings/preference'
                    className='sepp__sidebar-left__items sepp__sidebar-settings-item'
                    onClick={handleSidebarItemClick}
                  >
                    App Preference
                  </Link>

                  <Link
                    to='/boardoutlet/settings/notificationssettings'
                    className='sepp__sidebar-left__items sepp__sidebar-settings-item'
                    onClick={handleSidebarItemClick}
                  >
                    Notification Settings
                  </Link>

                  <Link
                    to='/boardoutlet/settings/reportissue'
                    className='sepp__sidebar-left__items sepp__sidebar-help-item'
                    onClick={handleSidebarItemClick}
                  >
                    Report Issue
                  </Link>
                </div>
              )}
            </div>
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
