import React from 'react'
import './article.scss'
import { motion } from 'framer-motion'

const Article = ({ article, onClick, isFeatured }) => {
  // Format date properly
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (e) {
      return 'Unknown date'
    }
  }

  // Construct full image URL
  const getImageUrl = (path) => {
    if (!path) return ''
    // Use environment variable for base URL with fallback
    const baseUrl =
      import.meta.env.VITE_APP_ASSET_URL || 'http://localhost:8000'
    // Remove any duplicate slashes
    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  }

  return (
    <motion.div
      className={`sepp__blog-container_article ${isFeatured ? 'featured' : ''}`}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      <div className='sepp__blog-container_article-image'>
        <img
          src={getImageUrl(article.main_image_url)}
          alt={article.title}
          onError={(e) => {
            e.target.src = '' // Fallback image
          }}
        />
      </div>
      <div className='sepp__blog-container_article-content'>
        <div>
          <p>{formatDate(article.created_at)}</p>
          <h3>{article.title}</h3>
        </div>
        <p className='read-more'>Read Full Article</p>
        {/* {isFeatured && <p className='read-more'>Read Full Article</p>} */}
      </div>
    </motion.div>
  )
}

export default Article

// import React from 'react'
// import './article.css'

// const Article = ({ imgUrl, date, title }) => {
//   return (
//     <div className='sepp__blog-container_article'>
//       <div className='sepp__blog-container_article-image'>
//         <img src={imgUrl} alt=' blogImage' />
//       </div>
//       <div className='sepp__blog-container_article-content'>
//         <p>{date}</p>
//         <h3>{title}</h3>
//         <p>Read Full Article</p>
//       </div>
//     </div>
//   )
// }

// export default Article
