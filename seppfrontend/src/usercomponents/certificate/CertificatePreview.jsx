// src/components/CertificatePreview.jsx
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './certificate.scss'

function mapGrade(score) {
  if (score >= 80) return 'A1'
  if (score >= 70) return 'A2'
  if (score >= 60) return 'A3'
  return null
}

const CertificatePreview = ({ match }) => {
  // If your router uses useParams, adapt accordingly
  // For react-router v6, use useParams(); here show a generic prop "match"
  const id = match?.params?.id || window.location.pathname.split('/').pop()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(`/certificate/preview/${id}`)
        // res.data.result expected
        setResult(res.data.result)
      } catch (err) {
        console.error('Failed to fetch certificate data', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading)
    return <div className='certificates__loading-container'>Loading...</div>
  if (!result)
    return (
      <div className='certificates__empty-state'>Certificate not available</div>
    )

  const logoUrl = '/public/mimages/cutoutsepp.png' // from your uploaded file
  const grade = mapGrade(Number(result.correct_answers_percentage))
  const certificateId = `SEPP-2025-${
    result.completion_date
      ? result.completion_date.replace(/-/g, '')
      : new Date().toISOString().slice(5, 10).replace('-', '')
  }-${result.id}`

  return (
    <div className='certificate-preview-wrap'>
      <div className='certificate-a4' id='certificateContent' role='document'>
        <div className='certificate-header'>
          <img src={logoUrl} alt='SEPP Logo' className='sepp-logo' />
          <div className='issuer'>Issued by: SEPP Exams Board</div>
        </div>

        <h1 className='certificate-title'>Certificate of Achievement</h1>

        <p className='certificate-presented'>This is to certify that</p>
        <h2 className='certificate-name'>{result.user_name}</h2>

        <p className='certificate-for'>has successfully completed</p>
        <h3 className='certificate-course'>
          {result.quiz_title} — {result.exam_segment || 'General'}
        </h3>

        <p className='certificate-score'>
          Score: <strong>{result.correct_answers_percentage}%</strong> • Grade:{' '}
          <strong>{grade}</strong>
        </p>

        <div className='certificate-meta'>
          <div>
            Certificate ID: <strong>{certificateId}</strong>
          </div>
          <div>
            Date:{' '}
            <strong>
              {result.completion_date ||
                new Date(result.created_at).toLocaleDateString()}
            </strong>
          </div>
        </div>

        <div className='certificate-signatures'>
          <div>
            <div className='sig-name'>Luca Bradson</div>
            <div className='sig-title'>Chairman, SEPP Exams Board</div>
          </div>
          <div>
            <div className='sig-name'>Ferndale Carl</div>
            <div className='sig-title'>Director of Assessments</div>
          </div>
        </div>
      </div>

      <div className='certificate-actions'>
        <a
          className='btn download'
          href={`/certificate/pdf/${result.id}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Download PDF
        </a>

        {/* <a
          className='btn download'
          href={`${import.meta.env.VITE_API_BASE_URL}/certificate/pdf/${
            result.id
          }`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Download PDF
        </a> */}
      </div>
    </div>
  )
}

export default CertificatePreview
