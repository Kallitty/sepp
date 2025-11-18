import React, { useEffect, useState } from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './jamb.scss'
import { ClipLoader } from 'react-spinners'

const Jamb = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes')
        // Filter quizzes that have "jamb" in their title (case insensitive)
        const jambQuizzes = response.data.filter((quiz) =>
          quiz.title.toLowerCase().includes('jamb')
        )
        setQuizzes(jambQuizzes)
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
      <div className='jamb__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} loading={loading} />
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className='jamb__empty-state'>
        <div className='jamb__empty-icon'>
          <FaGraduationCap />
        </div>
        <h3 className='jamb__empty-title'>No JAMB Quizzes Available</h3>
        <p className='jamb__empty-message'>
          Our contributors are working on this content. Kindly check back later.
        </p>
      </div>
    )
  }

  return (
    <div className='jamb__container'>
      {quizzes.map((quiz) => (
        <Link to={`/exam/${quiz.id}`} key={quiz.id} className='jamb__card'>
          <div className='jamb__icon'>
            <FaGraduationCap />
          </div>
          <div className='jamb__content'>
            <div className='jamb__title'>{quiz.title}</div>
            <div className='jamb__duration'>{quiz.duration} Minute(s)</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Jamb
