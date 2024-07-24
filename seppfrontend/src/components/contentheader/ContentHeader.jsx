import React from 'react'
import './contentheader.scss'
import { BiSearch, BiNotification } from 'react-icons/bi'

const ContentHeader = () => {
  return (
    <div className='sepp__content--header'>
      <h1 className='sepp__content--header--title'>Dashboard</h1>
      <div className='sepp__content--header--activity'>
        <div className='sepp__content--header--search-box'>
          <input type='text' placeholder='Search anything here...' />
          <BiSearch className='sepp__content--header-icon' />
        </div>
        <div className='sepp__content--header-notify'>
          <BiNotification className='sepp__content--header-icon' />
        </div>
      </div>
    </div>
  )
}

export default ContentHeader
