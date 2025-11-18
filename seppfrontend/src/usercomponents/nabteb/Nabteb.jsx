import React, { useEffect, useState } from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './nabteb.scss'
import { ClipLoader } from 'react-spinners'

const Nabteb = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes')
        // Filter quizzes that have "nabteb" in their title (case insensitive)
        const nabtebQuizzes = response.data.filter((quiz) =>
          quiz.title.toLowerCase().includes('nabteb')
        )
        setQuizzes(nabtebQuizzes)
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
      <div className='nabteb__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} loading={loading} />
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className='nabteb__empty-state'>
        <div className='nabteb__empty-icon'>
          <FaGraduationCap />
        </div>
        <h3 className='nabteb__empty-title'>No NABTEB Quizzes Available</h3>
        <p className='nabteb__empty-message'>
          Our contributors are working on this content. Kindly check back later.
        </p>
      </div>
    )
  }

  return (
    <div className='nabteb__container'>
      {quizzes.map((quiz) => (
        <Link to={`/exam/${quiz.id}`} key={quiz.id} className='nabteb__card'>
          <div className='nabteb__icon'>
            <FaGraduationCap />
          </div>
          <div className='nabteb__content'>
            <div className='nabteb__title'>{quiz.title}</div>
            <div className='nabteb__duration'>{quiz.duration} Minute(s)</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Nabteb
