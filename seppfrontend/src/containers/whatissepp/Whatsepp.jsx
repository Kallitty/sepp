import React from 'react'
import './whatsepp.css'
import Feature from '../../components/feature/Feature.jsx'
import Footer from '../../containers/footer/Footer.jsx'
import { NavbarWithAuth } from '../../components'
import ScrollToTop from '../scrolltotop/Scrolltotop'
import { Link } from 'react-router-dom'

const Whatsepp = () => {
  return (
    <>
      <NavbarWithAuth />
      <div
        className='min-h-screen flex items-center justify-center lg:mx-48 text-white'
        id='particle-js'
      >
        {/* <Lottie animationData={animationData} id='animation' /> */}
        <div className='sepp__whatsepp section__margin' id='wsepp'>
          <div className='sepp__whatsepp-feature'>
            <Feature
              title={'Who needs SEPP?'}
              text={
                "Everybody needs SEPP, Lol. But specifically, job seekers, professionals, and students preparing for exams benefit from the SEPP app's tailored study materials, practice tests, and exam preparation resources, enhancing their chances of success. "
              }
            />
          </div>
          <div className='sepp__whatsepp-heading'>
            <h1 className='gradient__text'>
              Imagine what you can achieve. Doesn't that make you smile
              sometimes?
            </h1>
            <p>
              <ScrollToTop to='/library'>Explore the resources...</ScrollToTop>
            </p>
          </div>
          <div className='sepp__whatsepp-container'>
            <Feature
              title={'Professionals'}
              text={
                'Professionals benefit from exam preparation resources for certifications. '
              }
            />
            <Feature
              title={'Job Seekers '}
              text={
                'Job seekers improve their chances with tools tailored for job-related exams.'
              }
            />
            <Feature
              title={'Students'}
              text={
                'Students gain access to study materials and practice tests for scholarship exams. '
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Whatsepp
