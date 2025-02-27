import React from 'react'
import './boardoutlet.scss'
import { Sidebar } from '../components'
import { Outlet } from 'react-router-dom'

export default function BoardOutlet() {
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
    <div id='boardOutlet'>
      <aside>
        <Sidebar />
      </aside>
      <div className='content'>
        <header>
          <div>
            <a href='#' className='btn-logout'>
              {getGreeting()}
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
