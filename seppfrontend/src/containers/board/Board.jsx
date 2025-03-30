import React from 'react'
import './board.scss'
import { Sidebar } from '../../components/'
import { Content } from '../../components/'
import { Profile } from '../../components/'

const Board = () => {
  const getGreeting = () => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      return 'Hello Seppie, Good Morning!💜'
    } else if (currentHour < 16) {
      return 'Hello Seppie, Good Afternoon!💜'
    } else {
      return 'Hello Seppie, Good Evening!💜'
    }
  }

  return (
    <div className='sepp__board-container'>
      {/* <Sidebar /> */}

      <div className='sepp__board-main'>
        <div className='sepp__board-greeting'>
          <h1>{getGreeting()}</h1>
        </div>

        <div className='sepp__board-content-wrapper'>
          <Content />
          <Profile />
        </div>
      </div>
    </div>
  )
}

export default Board
