import React from 'react'
// import './orders.scss'
import styles from './Orders.module.css'

const Orders = () => {
  return (
    <div className={styles.order}>
      <div className={styles.head}>
        <h3>Recent Quiz</h3>
        <i className='bx bx-search'></i>
        <i className='bx bx-filter'></i>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date Started</th>
            <th>Time Started</th>
            <th>Time Finished</th>
            <th>Status</th>
            <th>Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src='img/people.png' alt='User' />
              <p>John Muo</p>
            </td>
            <td>01-10-2024</td>
            <td>
              <span className={`${styles.status} ${styles.completed}`}>
                7:40:00 am
              </span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.completed}`}>
                8:20:08 am
              </span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.completed}`}>
                Completed
              </span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.completed}`}>
                Score
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <img src='img/people.png' alt='User' />
              <p>Kallie Psalm</p>
            </td>
            <td>01-10-2024</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                11:22:00 am
              </span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Score
              </span>
            </td>
          </tr>
          {/* More rows as needed */}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
