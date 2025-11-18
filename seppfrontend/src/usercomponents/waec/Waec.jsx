import React, { useEffect, useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './waec.scss'
import { ClipLoader } from 'react-spinners'

const Waec = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes')
        const waecQuizzes = response.data.filter((quiz) =>
          quiz.title.toLowerCase().includes('waec')
        )
        setQuizzes(waecQuizzes)
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
      <div className='waec__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className='waec__empty-state'>
        <div className='waec__empty-icon'>
          <FaBook />
        </div>
        <h3 className='waec__empty-title'>No WAEC Quizzes Available</h3>
        <p className='waec__empty-message'>
          Our contributors are working on this content. Kindly check back later.
        </p>
      </div>
    )
  }

  return (
    <div className='waec__container'>
      {quizzes.map((quiz) => (
        <Link to={`/exam/${quiz.id}`} key={quiz.id} className='waec__card'>
          <div className='waec__icon'>
            <FaBook />
          </div>
          <div className='waec__content'>
            <div className='waec__title'>{quiz.title}</div>
            <div className='waec__duration'>{quiz.duration} Minute(s)</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Waec
