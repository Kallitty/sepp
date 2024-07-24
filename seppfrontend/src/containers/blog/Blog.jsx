import React from 'react'
import './blog.css'
import Article from '../../components/article/Article.jsx'
import { blog_01, blog_02, blog_03, blog_04, blog_05 } from './imports.js'

const Blog = () => {
  return (
    <div className='sepp__blog section__padding' id='blog'>
      <div className='sepp__blog-heading'>
        <h1 className='gradient__text'>Explore Our Blog</h1>
        <div className='sepp__blog-container'>
          <div className='sepp__blog-container_groupA'>
            <Article
              imgUrl={blog_01}
              date='Nov 03, 2023'
              title='Study Tips and Strategies'
            />
          </div>
          <div className='sepp__blog-container_groupB'>
            <Article
              imgUrl={blog_05}
              date='Jan 14, 2024'
              title='Success Stories and Inspirations'
            />
            <Article
              imgUrl={blog_03}
              date='Jan 25, 2024'
              title=' Latest Examination Updates'
            />
            <Article
              imgUrl={blog_04}
              date='Feb 03, 2024'
              title='Career Development and Advancement'
            />
            <Article
              imgUrl={blog_02}
              date='Feb 18, 2024'
              title=' Community Spotlights and Events'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
