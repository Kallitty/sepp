// src/components/CertificatePreview.jsx
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './certificate.scss'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
// import jsPDF from 'jspdf'

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
  const printRef = useRef(null)

  //

  const handleDownloadPdf = async () => {
    const element = printRef.current

    // Capture certificate as image
    const canvas = await html2canvas(element, { scale: 2 })
    const dataUrl = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // 1️⃣ Add certificate image first
    pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight)

    // 2️⃣ Load watermark image
    const watermarkImg = await new Promise((resolve) => {
      const img = new Image()
      img.src = '/mimages/cutoutsepp.png' // your watermark icon
      img.onload = () => resolve(img)
    })

    // 3️⃣ Tile small watermarks across the PDF diagonally
    const tileSize = 20 // size of watermark
    const gap = 20 // spacing between tiles
    const opacity = 0.08 // faint watermark
    const angle = 45 // rotation angle in degrees

    pdf.setGState(new pdf.GState({ opacity }))

    let row = 0

    for (let y = 0; y < pageHeight; y += gap) {
      const offsetX = (row % 2) * (gap / 2) // stagger rows diagonally

      for (let x = -offsetX; x < pageWidth; x += gap) {
        pdf.addImage(
          watermarkImg,
          'PNG',
          x,
          y,
          tileSize,
          tileSize,
          undefined,
          undefined,
          angle // rotation in degrees
        )
      }

      row++
    }

    pdf.setGState(new pdf.GState({ opacity: 1 }))

    const safeName = result.user_name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    pdf.save(`${safeName}.pdf`)
  }

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
  const certificateId = `SEPP-202-${
    result.completion_date
      ? result.completion_date.replace(/-/g, '')
      : new Date().toISOString().slice(5, 10).replace('-', '')
  }-${result.id}`

  return (
    <div className='certificate-preview-wrap'>
      <div
        ref={printRef}
        className='certificate-a4'
        id='certificateContent'
        role='document'
      >
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
        <button
          onClick={handleDownloadPdf}
          className='btn download'
          target='_blank'
          rel='noopener noreferrer'
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}

export default CertificatePreview
