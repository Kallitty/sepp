import React, { useEffect, useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './neco.scss'
import { ClipLoader } from 'react-spinners'

const Neco = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes')
        // Filter quizzes that have "neco" in their title (case insensitive)
        const necoQuizzes = response.data.filter((quiz) =>
          quiz.title.toLowerCase().includes('neco')
        )
        setQuizzes(necoQuizzes)
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
      <div className='neco__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} loading={loading} />
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className='neco__empty-state'>
        <div className='neco__empty-icon'>
          <FaBook />
        </div>
        <h3 className='neco__empty-title'>No NECO Quizzes Available</h3>
        <p className='neco__empty-message'>
          Our contributors are working on this content. Kindly check back later.
        </p>
      </div>
    )
  }

  return (
    <div className='neco__container'>
      {quizzes.map((quiz) => (
        <Link to={`/exam/${quiz.id}`} key={quiz.id} className='neco__card'>
          <div className='neco__icon'>
            <FaBook />
          </div>
          <div className='neco__content'>
            <div className='neco__title'>{quiz.title}</div>
            <div className='neco__duration'>{quiz.duration} Minute(s)</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Neco
