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
        </div>
        <a href='#' className={styles.btnDownload}>
          <i className='bx bxs-cloud-download'></i>
          <span className={styles.text}>Download PDF</span>
        </a>
      </div>
      <div className={styles.dashboard}>
        <BoxInfo />
      </div>
      <div className={styles.tableData}>
        <Orders />
        {/* <Todos /> */}
      </div>
    </main>
  )
}

export default Dashboard
