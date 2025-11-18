import React from 'react'
import './profileheader.scss'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const ProfileHeader = () => {
  return (
    <div className='sepp__profileheader--header'>
      <h2 className='sepp__profileheader--title'>Profile</h2>
      <div className='sepp__profileheader--edit'>
        <Link to='/admin/dashboard'>
          <BiEdit className='sepp__profileheader--icon' />
        </Link>
      </div>
    </div>
  )
}

export default ProfileHeader
