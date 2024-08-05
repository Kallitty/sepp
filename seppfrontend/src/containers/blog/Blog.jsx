import React from 'react'
import './blog.css'
import Article from '../../components/article/Article.jsx'
import { blog_01, blog_02, blog_03, blog_04, blog_05 } from './imports.js'
import { motion } from 'framer-motion'

const Blog = () => {
  return (
    <div className='sepp__blog section__padding' id='blog'>
      <div className='sepp__blog-heading'>
        <motion.h1
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
          className='gradient__text'
        >
          Explore Our Blog
        </motion.h1>
        <div className='sepp__blog-container'>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className='sepp__blog-container_groupA'
          >
            <Article
              imgUrl={blog_01}
              date='Nov 03, 2023'
              title='Study Tips and Strategies'
            />
          </motion.div>
          <div className='sepp__blog-container_groupB'>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
            >
              <Article
                imgUrl={blog_05}
                date='Jan 14, 2024'
                title='Success Stories and Inspirations'
              />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1.5 }}
            >
              <Article
                imgUrl={blog_03}
                date='Jan 25, 2024'
                title=' Latest Examination Updates'
              />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 1.5 }}
            >
              <Article
                imgUrl={blog_04}
                date='Feb 03, 2024'
                title='Career Development and Advancement'
              />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1.5 }}
            >
              <Article
                imgUrl={blog_02}
                date='Feb 18, 2024'
                title=' Community Spotlights and Events'
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
