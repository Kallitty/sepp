import React, { useEffect, useState } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './job.scss'
import { ClipLoader } from 'react-spinners'

const Job = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes')
        // Filter quizzes that have "job" in their title (case insensitive)
        const jobQuizzes = response.data.filter((quiz) =>
          quiz.title.toLowerCase().includes('i')
        )
        setQuizzes(jobQuizzes)
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  if (loading) {
    return (
      <div className='job__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} loading={loading} />
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className='job__empty-state'>
        <div className='job__empty-icon'>
          <FaBriefcase />
        </div>
        <h3 className='job__empty-title'>No Job Quizzes Available</h3>
        <p className='job__empty-message'>
          Our contributors are working on this content. Kindly check back later.
        </p>
      </div>
    )
  }

  return (
    <div className='job__container'>
      {quizzes.map((quiz) => (
        <Link to={`/exam/${quiz.id}`} key={quiz.id} className='job__card'>
          <div className='job__icon'>
            <FaBriefcase />
          </div>
          <div className='job__content'>
            <div className='job__title'>{quiz.title}</div>
            <div className='job__duration'>{quiz.duration} Minute(s)</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Job
