import React from 'react'
import './content.scss'
import ContentHeader from '../contentheader/ContentHeader'
import Card from '../card/Card'
import TutorList from '../tutorlist/TutorList'

const Content = () => {
  return (
    <div className='sepp__content'>
      <ContentHeader />
      <Card />
      <TutorList />
    </div>
  )
}

export default Content
