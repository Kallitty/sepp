import React from 'react'
import Feature from '../../components/feature/Feature.jsx'
import './features.css'

const featueresData = [
  {
    title: 'Accessibility',
    text: "We believe that access to essential resources should be available to everyone, regardless of background or ability. That's why we've built our platform to be accessible to all users.",
  },
  {
    title: 'User Experience (UX)',
    text: "Navigating the world of professional examinations can be daunting, which is why we've prioritized a user-friendly experience. Our intuitive interface makes it easy to find the information you need, whether you're researching exam requirements, exploring study materials, or planning your exam schedule..",
  },
  {
    title: 'Content Quality',
    text: "When it comes to exam preparation, quality matters. That's why we've curated a comprehensive collection of resources to help you succeed. From detailed examination guides to practice questions and study tips, you'll find everything you need to prepare effectively and confidently.",
  },
  {
    title: 'Community',
    text: "Preparing for a professional exam is a journey best shared with others. That's why we've built a vibrant community where you can connect with peers, ask questions, and share insights. Join the conversation on our forums, discussion boards, or social media channels and tap into the collective wisdom.",
  },
]

const Features = () => {
  return (
    <div className='sepp__features section__padding' id='features'>
      <div className='sepp__features-heading'>
        <h1 className='gradient__text'>
          Your Best Career Choice Is Now, We Are Rooting For You To Succeed. You
          Need To Step In & Make It Happen.
        </h1>
        <p> Request Early Access to Make it Happen...</p>
      </div>
      <div className='sepp__features-container'>
        {featueresData.map((item, index) => (
          <Feature
            title={item.title}
            text={item.text}
            key={item.title + index}
          />
        ))}
      </div>
    </div>
  )
}

export default Features
