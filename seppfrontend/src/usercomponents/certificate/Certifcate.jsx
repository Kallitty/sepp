import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './certificate.scss'
import { ClipLoader } from 'react-spinners'
import { FaAward } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

  const handleDirectDownload = async (id) => {
    try {
      const res = await axios.get(`/certificate/preview/${id}`)
      const result = res.data.result

      const temp = document.createElement('div')
      temp.style.position = 'fixed'
      temp.style.left = '-9999px'
      temp.style.top = '0'
      temp.style.width = '1122px'
      temp.style.height = '793px'
      temp.style.padding = '40px 60px'
      temp.style.background = 'white'
      temp.style.fontFamily = 'Georgia, serif'
      temp.style.boxSizing = 'border-box'

      temp.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <img src="/public/mimages/cutoutsepp.png" style="height:70px;" />
          <div style="font-weight:600;color:#6b2f74;">Issued by: SEPP Exams Board</div>
        </div>

        <h1 style="text-align:center;color:#470647;font-size:34px;margin-top:20px;">
          Certificate of Achievement
        </h1>

        <p style="text-align:center;margin-top:8px;color:#555;">This is to certify that</p>

        <h2 style="text-align:center;font-size:30px;margin-top:6px;color:#2c0326;font-weight:700;">
          ${result.user_name}
        </h2>

        <p style="text-align:center;margin-top:5px;">has successfully completed</p>

        <h3 style="text-align:center;font-size:22px;margin-top:6px;color:#333;font-weight:600;">
          ${result.quiz_title} — ${result.exam_segment || 'General'}
        </h3>

        <p style="text-align:center;margin-top:12px;font-size:18px;color:#333;">
          Score: <strong>${
            result.correct_answers_percentage
          }%</strong> • Grade: 
          <strong>${mapGrade(result.correct_answers_percentage)}</strong>
        </p>

        <div style="display:flex;justify-content:center;margin-top:18px;font-size:14px;color:#555;gap:40px;">
          <div>Certificate ID: <strong>${result.id}</strong></div>
          <div>Date: <strong>${
            result.completion_date ||
            new Date(result.created_at).toLocaleDateString()
          }</strong></div>
        </div>

        <div style="position:absolute;bottom:40px;left:60px;right:60px;display:flex;justify-content:space-between;">
          <div>
            <div style="font-weight:700;color:#2c0326;">Luca Bradson</div>
            <div style="font-size:13px;color:#666;">Chairman, SEPP Exams Board</div>
          </div>
          <div>
            <div style="font-weight:700;color:#2c0326;">Ferndale Carl</div>
            <div style="font-size:13px;color:#666;">Director of Assessments</div>
          </div>
        </div>
      `

      document.body.appendChild(temp)

      const canvas = await html2canvas(temp, { scale: 2 })
      const dataUrl = canvas.toDataURL('image/png')

      document.body.removeChild(temp)

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4',
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight)

      const watermark = await new Promise((resolve) => {
        const img = new Image()
        img.src = '/mimages/cutoutsepp.png'
        img.onload = () => resolve(img)
      })

      const tileSize = 26
      const gap = 70
      const opacity = 0.06
      const angle = 45

      pdf.setGState(new pdf.GState({ opacity }))

      for (let y = -100; y < pageHeight + 100; y += gap) {
        for (let x = -100; x < pageWidth + 100; x += gap) {
          pdf.addImage(
            watermark,
            'PNG',
            x,
            y,
            tileSize,
            tileSize,
            undefined,
            undefined,
            angle
          )
        }
      }

      pdf.setGState(new pdf.GState({ opacity: 1 }))

      const safeName = result.user_name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
      pdf.save(`${safeName}.pdf`)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/user-quiz-results')
        if (res.data.status === 200) {
          let data = res.data.results || []
          if (!Array.isArray(data)) data = [data]

          const passed = data
            .map((r) => ({
              ...r,
              correct_answers_percentage: Number(r.correct_answers_percentage),
              grade: mapGrade(Number(r.correct_answers_percentage)),
            }))
            .filter((r) => r.correct_answers_percentage >= 60)

          setResults(passed)
        }
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
              <div className='certificates__icon'>{/* <FaAward /> */}</div>

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
                    onClick={() => handleDirectDownload(resItem.id)}
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
