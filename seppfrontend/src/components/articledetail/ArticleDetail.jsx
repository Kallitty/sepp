import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './articledetail.scss'
import { motion } from 'framer-motion'
import ClipLoader from 'react-spinners/ClipLoader'
import Footer from '../../containers/footer/Footer'

const ArticleDetail = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch by slug instead of ID
        const response = await axios.get(`/articles/slug/${slug}`)
        setArticle(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching article:', error)
        setError('Failed to load article')
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  // Format date properly
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (e) {
      return 'Unknown date'
    }
  }

  // Dynamic image URL construction
  const getImageUrl = (path) => {
    if (!path) return ''
    const baseUrl =
      import.meta.env.VITE_APP_ASSET_URL || 'http://localhost:8000'
    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  }

  // Get current display image
  const getCurrentImage = () => {
    if (!article) return ''

    if (currentImageIndex === 0) {
      return article.main_image_url
        ? getImageUrl(article.main_image_url)
        : `${
            import.meta.env.VITE_APP_ASSET_URL
          }/uploads/default-article-image.jpg`
    }

    const additionalIndex = currentImageIndex - 1
    if (article.additional_image_urls?.length > additionalIndex) {
      return getImageUrl(article.additional_image_urls[additionalIndex])
    }

    return ''
  }

  if (loading) {
    return (
      <div className='loading-overlay'>
        <ClipLoader size={50} color={'#5a3a56'} loading={loading} />
      </div>
    )
  }

  if (error) {
    return <div className='article-error'>{error}</div>
  }

  if (!article) {
    return <div className='article-not-found'>Article not found</div>
  }

  return (
    <>
      <motion.div
        className='article-detail'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='article-header'>
          <h1>{article.title}</h1>
          <p className='article-meta'>
            Published on {formatDate(article.created_at)} | By {article.author}
          </p>
        </div>

        <div className='article-image-container'>
          <div className='article-main-image'>
            <img
              src={getCurrentImage()}
              alt={article.title}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg'
              }}
            />
            {article.additional_image_urls?.length > 0 && (
              <>
                <button
                  className='image-nav-btn prev-btn'
                  onClick={() =>
                    setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
                  }
                  disabled={currentImageIndex === 0}
                >
                  &lt;
                </button>
                <button
                  className='image-nav-btn next-btn'
                  onClick={() =>
                    setCurrentImageIndex(
                      Math.min(
                        article.additional_image_urls?.length || 0,
                        currentImageIndex + 1
                      )
                    )
                  }
                  disabled={
                    currentImageIndex ===
                    (article.additional_image_urls?.length || 0)
                  }
                >
                  &gt;
                </button>
              </>
            )}
          </div>

          {article.additional_image_urls?.length > 0 && (
            <div className='article-thumbnails'>
              {/* Main image thumbnail */}
              <img
                src={getImageUrl(article.main_image_url)}
                alt={`${article.title} main`}
                className={currentImageIndex === 0 ? 'active' : ''}
                onClick={() => setCurrentImageIndex(0)}
              />
              {/* Additional images thumbnails */}
              {article.additional_image_urls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={getImageUrl(imageUrl)}
                  alt={`${article.title} ${index + 1}`}
                  className={currentImageIndex === index + 1 ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              ))}
            </div>
          )}
        </div>

        <div className='article-content'>
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
      <Footer />
    </>
  )
}

export default ArticleDetail

// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import './articledetail.scss'
// import { motion } from 'framer-motion'

// const ArticleDetail = () => {
//   const { id } = useParams()
//   const [article, setArticle] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await axios.get(`/articles/${id}`)
//         setArticle(response.data)
//         setError(null)
//       } catch (error) {
//         console.error('Error fetching article:', error)
//         setError('Failed to load article')
//         setArticle(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchArticle()
//   }, [id])

//   // Format date properly
//   const formatDate = (dateString) => {
//     try {
//       const options = { year: 'numeric', month: 'long', day: 'numeric' }
//       return new Date(dateString).toLocaleDateString(undefined, options)
//     } catch (e) {
//       return 'Unknown date'
//     }
//   }

//   // Construct full image URL
//   const getImageUrl = (path) => {
//     if (!path) return ''
//     // If using Laravel's storage, prepend your backend URL
//     return `http://your-backend-url${path}` // Replace with your actual backend URL
//   }

//   if (loading) {
//     return <div className='article-loading'>Loading...</div>
//   }

//   if (error) {
//     return <div className='article-error'>{error}</div>
//   }

//   if (!article) {
//     return <div className='article-not-found'>Article not found</div>
//   }

//   return (
//     <motion.div
//       className='article-detail'
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className='article-header'>
//         <h1>{article.title}</h1>
//         <p className='article-meta'>
//           Published on {formatDate(article.created_at)} | {article.author}
//         </p>
//       </div>

//       <div className='article-image'>
//         <img
//           src={getImageUrl(article.main_image_url)}
//           alt={article.title}
//           onError={(e) => {
//             e.target.src = '/placeholder-image.jpg' // Fallback image
//           }}
//         />
//       </div>

//       <div className='article-content'>
//         {article.content.split('\n').map((paragraph, index) => (
//           <p key={index}>{paragraph}</p>
//         ))}
//       </div>

//       {article.additional_image_urls &&
//         article.additional_image_urls.length > 0 && (
//           <div className='article-gallery'>
//             {article.additional_image_urls.map((imageUrl, index) => (
//               <img
//                 key={index}
//                 src={getImageUrl(imageUrl)}
//                 alt={`${article.title} ${index + 1}`}
//                 onError={(e) => {
//                   e.target.src = '/' // Fallback image, placeholder-image.jpg
//                 }}
//               />
//             ))}
//           </div>
//         )}
//     </motion.div>
//   )
// }

// export default ArticleDetail
