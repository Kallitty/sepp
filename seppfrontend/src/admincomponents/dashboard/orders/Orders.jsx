import React, { useEffect, useState } from 'react'
import styles from './Orders.module.css'
import axios from 'axios'
import { format } from 'date-fns'
import { ClipLoader } from 'react-spinners'
import { DefaultProfilePic } from '../../../components/profile/defaultprofp'

const Orders = () => {
  const [recentQuizzes, setRecentQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecentQuizzes = async () => {
      try {
        const response = await axios.get('/allquiz-results')
        const sortedResults = response.data.results
          .map((result) => ({
            ...result,
            // Convert score to percentage (assuming score is out of 100)
            score: result.score !== null ? Math.round(result.score) : null,
            // Ensure status is properly set
            status:
              result.status ||
              (result.score !== null ? 'completed' : 'pending'),
            // Add profile picture URL
            profile_picture: result.user?.profile_picture || DefaultProfilePic,
          }))
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)

        setRecentQuizzes(sortedResults)
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to fetch recent quizzes'
        )
        console.error('Error fetching quizzes:', err)
        setRecentQuizzes([
          {
            id: 1,
            user_name: 'John Muo',
            profile_picture: DefaultProfilePic,
            created_at: '2024-01-10T07:40:00.000Z',
            updated_at: '2024-01-10T08:20:08.000Z',
            score: 85,
            status: 'completed',
            quiz_title: 'General Knowledge',
          },
          {
            id: 2,
            user_name: 'Kallie Psalm',
            profile_picture: DefaultProfilePic,
            created_at: '2024-01-10T11:22:00.000Z',
            updated_at: null,
            score: null,
            status: 'pending',
            quiz_title: 'Science Quiz',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRecentQuizzes()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return format(new Date(dateString), 'MM-dd-yyyy')
  }

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A'
    return format(new Date(dateString), 'h:mm:ss a')
  }

  const getStatusClass = (status) => {
    return status === 'completed' ? styles.completed : styles.pending
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader size={50} color={'#470647'} />
        <p>Loading recent quiz results...</p>
      </div>
    )
  }

  return (
    <div className={styles.order}>
      <div className={styles.head}>
        <h3>Recent Quiz</h3>
        <i className='bx bx-search'></i>
        <i className='bx bx-filter'></i>
      </div>
      {error && <div className={styles.error}>{error}</div>}
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
          {recentQuizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>
                <img
                  src={quiz.profile_picture || DefaultProfilePic}
                  alt='User'
                  className={styles.userAvatar}
                  onError={(e) => {
                    e.target.src = DefaultProfilePic
                  }}
                />
                <p>{quiz.user_name}</p>
              </td>
              <td>{formatDate(quiz.created_at)}</td>
              <td>
                <span
                  className={`${styles.status} ${getStatusClass(quiz.status)}`}
                >
                  {formatTime(quiz.created_at)}
                </span>
              </td>
              <td>
                <span
                  className={`${styles.status} ${getStatusClass(quiz.status)}`}
                >
                  {quiz.status === 'completed'
                    ? formatTime(quiz.updated_at)
                    : 'Pending'}
                </span>
              </td>
              <td>
                <span
                  className={`${styles.status} ${getStatusClass(quiz.status)}`}
                >
                  {quiz.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </td>
              <td>
                <span
                  className={`${styles.status} ${getStatusClass(quiz.status)}`}
                >
                  {quiz.status === 'completed' ? `${quiz.score}%` : 'N/A'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
