import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './blog.scss'
import Article from '../../components/article/Article.jsx'
import { motion } from 'framer-motion'
import Footer from '../footer/Footer'

const Blog = ({ showAll = false }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/articles')
        setArticles(Array.isArray(response?.data) ? response.data : [])
        setError(null)
      } catch (error) {
        console.error('Error fetching articles:', error)
        setError('Failed to load articles')
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const handleArticleClick = (slug) => {
    navigate(`/blog/${slug}`)
  }

  if (loading) {
    return (
      <div className='sepp__blog-loading'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <>
      <div className='sepp__blog section__padding' id='blog'>
        <div className='sepp__blog-heading'>
          <motion.h1
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className='gradient__text'
          >
            Explore Our Blog
          </motion.h1>
          <div className={`sepp__blog-container ${showAll ? 'full-view' : ''}`}>
            {articles.length > 0 ? (
              <>
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className='sepp__blog-container_groupA'
                >
                  <Article
                    article={articles[0]}
                    onClick={() => handleArticleClick(articles[0].slug)}
                    isFeatured={true}
                  />
                </motion.div>
                <div className='sepp__blog-container_groupB'>
                  {/* {articles.slice(1, 5).map((article, index) => ( */}
                  {(showAll ? articles.slice(1) : articles.slice(1, 5)).map(
                    (article, index) => (
                      <motion.div
                        key={article.slug}
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{
                          opacity: 0,
                          x: index % 2 === 0 ? -100 : 100,
                        }}
                        transition={{ duration: 1.5 }}
                      >
                        <Article
                          article={article}
                          onClick={() => handleArticleClick(article.slug)}
                          isFeatured={false}
                        />
                      </motion.div>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className='sepp__blog-empty'>
                No articles found. Check back later!
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blog
