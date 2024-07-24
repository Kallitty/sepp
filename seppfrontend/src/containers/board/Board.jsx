import React from 'react'
import './board.scss'
import { Sidebar } from '../../components/'
import { Content } from '../../components/'
import { Profile } from '../../components/'

const Board = () => {
  return (
    <div className='sepp__board'>
      {/* <Sidebar /> */}
      <div className='sepp__board--content'>
        <Content />
        <Profile />
      </div>
    </div>
  )
}

export default Board
