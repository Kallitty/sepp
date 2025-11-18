import React, { useEffect, useState } from 'react'
import styles from './BoxInfo.module.css'
import {
  FaUsers,
  FaUserCheck,
  FaUserShield,
  FaMoneyBillWave,
} from 'react-icons/fa'
import axios from 'axios'

// Define your stats configuration here
const STATS_CONFIG = [
  {
    key: 'totalUsers',
    icon: 'users',
    color: 'blue',
    label: 'Total Users',
    iconComponent: <FaUsers className={styles.icon} />,
    format: (value) => value,
    dummyValue: '1,250',
  },
  {
    key: 'contributors',
    icon: 'user-shield',
    color: 'orange',
    label: 'Contributors',
    iconComponent: <FaUserShield className={styles.icon} />,
    format: (value) => value,
    dummyValue: '45',
  },
  {
    key: 'totalPayment',
    icon: 'money-bill',
    color: 'yellow',
    label: 'Total Payment',
    iconComponent: <FaMoneyBillWave className={styles.icon} />,
    format: (value) => `$${value}`,
    dummyValue: '12,345',
  },
]

const BoxInfo = () => {
  const [statsData, setStatsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('dashboard-stats')
        // Initialize with null values in case some stats are missing
        const initialData = STATS_CONFIG.reduce((acc, config) => {
          acc[config.key] = null
          return acc
        }, {})

        // Merge with actual data
        setStatsData({
          ...initialData,
          ...response.data.stats,
        })
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to fetch dashboard stats'
        )
        console.error('Error fetching stats:', err)
        // Initialize with dummy data for all stats
        const dummyData = STATS_CONFIG.reduce((acc, config) => {
          acc[config.key] = config.dummyValue
          return acc
        }, {})
        setStatsData(dummyData)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className={styles.boxInfoContainer}>
        {STATS_CONFIG.map((item, index) => (
          <div key={index} className={styles.boxInfoItemSkeleton}>
            <div className={styles.iconContainerSkeleton}></div>
            <div className={styles.textContainerSkeleton}>
              <div className={styles.countSkeleton}></div>
              <div className={styles.labelSkeleton}></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Prepare stats for rendering by combining config with data
  const statsToRender = STATS_CONFIG.map((config) => {
    const rawValue = statsData[config.key]
    let displayValue = 'N/A'

    if (rawValue !== null && rawValue !== undefined) {
      displayValue = config.format ? config.format(rawValue) : rawValue
    } else {
      displayValue = config.dummyValue
    }

    return {
      ...config,
      count: displayValue,
    }
  })

  return (
    <div className={styles.boxInfoContainer}>
      {statsToRender.map((stat, index) => (
        <div key={index} className={styles.boxInfoItem}>
          <div className={`${styles.iconContainer} ${styles[stat.color]}`}>
            {stat.iconComponent}
          </div>
          <div className={styles.textContainer}>
            <h3>{stat.count}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export default BoxInfo
