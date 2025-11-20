import React, { useEffect, useState } from 'react'
import { FaAward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './certificate.scss'
import { ClipLoader } from 'react-spinners'

const Certificate = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes')
        const certificateQuizzes = response.data.filter((quiz) =>
          quiz.title.toLowerCase().includes('certificate')
        )
        setQuizzes(certificateQuizzes)
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
      <div className='certificates__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className='certificates__empty-state'>
        <div className='certificates__empty-icon'>
          <FaAward />
        </div>
        <h3 className='certificates__empty-title'>No Certificates Available</h3>
        <p className='certificates__empty-message'>
          Apologies. Certificates are given on Merit and you are not eligible
          for this at this time.
        </p>
      </div>
    )
  }

  return (
    <div className='certificates__container'>
      {quizzes.map((quiz) => (
        <Link
          to={`/exam/${quiz.id}`}
          key={quiz.id}
          className='certificates__card'
        >
          <div className='certificates__icon'>
            <FaAward />
          </div>
          <div className='certificates__content'>
            <div className='certificates__title'>{quiz.title}</div>
            <div className='certificates__duration'>
              {quiz.duration} Minute(s)
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Certificate
