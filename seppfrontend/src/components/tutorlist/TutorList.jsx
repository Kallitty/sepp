import React from 'react'
import './tutorlist.scss'
import { Profil } from './importtl.js'

const tutors = [
  {
    id: 1,
    image: Profil,
    name: 'Dr U. Psalm',
    duration: '6 hours',
    cost: '24.90',
  },

  {
    id: 2,
    image: 'Image45',
    name: 'Prof M. Edu',
    duration: '4 hours',
    cost: '27.80',
  },
  {
    id: 3,
    image: 'Image5',
    name: 'Mrs M. Cath',
    duration: '4.5 hours',
    cost: '25.80',
  },
  {
    id: 4,
    image: 'Image85',
    name: 'Prof C. Mia',
    duration: '4 hours',
    cost: '27.80',
  },
]

const TutorList = () => {
  return (
    <div className='sepp__tutorlist'>
      <div className='sepp__tutorlist--header'>
        <h2>Tutors</h2>
        <select name='' id=''>
          <option value='English'>English</option>
          <option value='French'>French</option>
          <option value='Spanish'>Spanish</option>
        </select>
      </div>
      <div className='sepp__tutorlist-container'>
        {tutors.map((tutor) => (
          <div key={tutor.id} className='sepp__tutorlist--list'>
            <div className='sepp__tutorlist--tutor-detail'>
              <img src={tutor.image} alt={tutor.name} />
              <h4>{tutor.name}</h4>
            </div>
            <span>{tutor.duration}</span>
            <span>${tutor.cost}/hr</span>
            <span className='sepp__tutorlist--tutor-todo'>|</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TutorList
