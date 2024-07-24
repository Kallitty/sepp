import React from 'react'
import './profile.scss'
import ProfileHeader from '../profileheader/ProfileHeader'
import UserInfo from './userinfo/UserInfo'
import QuizList from './quizlist/QuizList'

const Profile = () => {
  return (
    <div className='sepp__profile'>
      <ProfileHeader />
      <div className='sepp__profile-user--profile'>
        <UserInfo />
        <QuizList />
      </div>
    </div>
  )
}

export default Profile
