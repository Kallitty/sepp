import React from 'react'
import { FaBook, FaPlayCircle, FaUsers } from 'react-icons/fa'
import './card.scss'

const course = [
  { id: 1, title: 'Study Ebook', icon: <FaBook /> },
  { id: 2, title: 'Study Videos', icon: <FaPlayCircle /> },
  { id: 3, title: 'Community Chat', icon: <FaUsers /> },
]

const Card = () => {
  return (
    <div className='sepp__card-container'>
      {course.map((item) => (
        <div key={item.id} className='sepp__card'>
          <div className='sepp__card--cover'>{item.icon}</div>
          <div className='sepp__card--title'>{item.title}</div>
        </div>
      ))}
    </div>
  )
}

export default Card
