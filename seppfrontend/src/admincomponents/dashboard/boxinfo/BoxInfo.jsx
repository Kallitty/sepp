import React from 'react'
import styles from './BoxInfo.module.css'
import { FaBox } from 'react-icons/fa' // Assuming you're using boxicons package

const BoxInfo = ({ icon, count, label }) => {
  return (
    <li className={styles.boxInfoItem}>
      <div className={styles.iconContainer}>
        <FaBox className={styles.icon} name={icon} />
      </div>
      <div className={styles.textContainer}>
        <h3>{count}</h3>
        <p>{label}</p>
      </div>
    </li>
  )
}

export default BoxInfo
