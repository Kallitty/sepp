import React from 'react'
import './profileheader.scss'
import { BiEdit } from 'react-icons/bi'

const ProfileHeader = () => {
  return (
    <div className='sepp__profileheader--header'>
      <h2 className='sepp__profileheader--title'>Profile</h2>
      <div className='sepp__profileheader--edit'>
        <BiEdit className='sepp__profileheader--icon' />
      </div>
    </div>
  )
}

export default ProfileHeader
