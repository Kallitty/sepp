import React from 'react'
import './boardoutlet.scss'
import { Sidebar } from '../components'
import { Outlet } from 'react-router-dom'

export default function BoardOutlet() {
  return (
    <div id='boardOutlet'>
      <aside>
        <Sidebar />
      </aside>
      <div className='content'>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
