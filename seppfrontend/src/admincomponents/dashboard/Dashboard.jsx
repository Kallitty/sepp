import React from 'react'
import './dashboard.scss'
import './variables.css'

import styles from './Main.module.css'

import Orders from './orders/Orders'
import Todos from './todolist/TodoList'
import BoxInfo from './boxinfo/BoxInfo'

const Dashboard = () => {
  return (
    <main className={styles.main}>
      <div className={styles.headTitle}>
        <div className={styles.left}>
          <h1>Dashboard</h1>
          <ul className={styles.breadcrumb}>
            <li>
              <a href='#'>Dashboard</a>
            </li>
            <li>
              <i className='bx bx-chevron-right'></i>
            </li>
            <li>
              <a className='active' href='#'>
                Home
              </a>
            </li>
          </ul>
        </div>
        <a href='#' className={styles.btnDownload}>
          <i className='bx bxs-cloud-download'></i>
          <span className={styles.text}>Download PDF</span>
        </a>
      </div>
      <div className={styles.dashboard}>
        <ul className={styles.boxInfoList}>
          <BoxInfo icon='bxs-calendar-check' count='1020' label='New Users' />
          <BoxInfo icon='bxs-group' count='2834' label='Visitors' />
          <BoxInfo
            icon='bxs-dollar-circle'
            count='$2543'
            label='Total Payment'
          />
        </ul>
      </div>
      <div className={styles.tableData}>
        <Orders />
        <Todos />
      </div>
    </main>
  )
}

export default Dashboard
