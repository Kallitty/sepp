// src/components/Certificate.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './certificate.scss'
import { ClipLoader } from 'react-spinners'
import { FaAward } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function mapGrade(score) {
  if (score >= 80) return 'A1'
  if (score >= 70) return 'A2'
  if (score >= 60) return 'A3'
  return null
}

const Certificate = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/user-quiz-results') // auth via sanctum
        if (res.data.status === 200) {
          // results can be an array or single object -> normalize
          let data = res.data.results || []
          if (!Array.isArray(data)) data = [data]

          // Only keep those with >= 60%
          const passed = data
            .map((r) => ({
              ...r,
              correct_answers_percentage: Number(r.correct_answers_percentage),
              grade: mapGrade(Number(r.correct_answers_percentage)),
            }))
            .filter((r) => r.correct_answers_percentage >= 60)

          setResults(passed)
        }
      } catch (err) {
        console.error('Failed to fetch user results', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading)
    return (
      <div className='certificates__loading-container'>
        <ClipLoader size={50} color={'#470647'} />
      </div>
    )

  return (
    <div className='certificates__container'>
      <h1>
        {' '}
        <FaAward />
      </h1>

      {results.length === 0 ? (
        <div className='certificates__empty-state'>
          <div className='certificates__empty-icon'></div>
          <h3 className='certificates__empty-title'>
            No Certificate(s) Available
          </h3>
          <p className='certificates__empty-message'>
            Apologies. Certificates are given on Merit and you are not eligible
            for this at this time.
          </p>
        </div>
      ) : (
        <div className='certificates__grid'>
          {results.map((resItem) => (
            <div className='certificates__card' key={resItem.id}>
              <div className='certificates__icon'>
                <FaAward />
              </div>

              <div className='certificates__content'>
                <div className='certificates__title'>{resItem.quiz_title}</div>
                <div className='certificates__meta'>
                  <span>Score: {resItem.correct_answers_percentage}%</span>
                  <span>Grade: {resItem.grade}</span>
                </div>

                <div className='certificates__actions'>
                  <button
                    onClick={() =>
                      navigate(`/boardoutlet/certificate/preview/${resItem.id}`)
                    }
                    className='btn view'
                  >
                    View Certificate
                  </button>

                  <button
                    onClick={() => {
                      // Download - opens the pdf endpoint in a new tab
                      // window.open(
                      //   `/boardoutlet/certificate/pdf/${resItem.id}`,
                      //   '_blank')

                      window.open(
                        `http://localhost:8000/certificate/pdf/${resItem.id}`,
                        '_blank'
                      )
                    }}
                    className='btn download'
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Certificate
