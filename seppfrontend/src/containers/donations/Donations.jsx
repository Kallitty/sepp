import React from 'react'
import './donations.scss'
import { Navbar } from '../../components'
import Footer from '../footer/Footer'
import { FaDonate, FaHandsHelping, FaSchool } from 'react-icons/fa'

const Donations = () => {
  return (
    <>
      <Navbar />
      <div className='sepp__donations section__padding'>
        <div className='sepp__donations-header'>
          <h1 className='gradient__text'>Support the SEPP Project</h1>
          <>
            Our mission is to enhance educational resources and provide
            fundamental necessities to people in need across the world. Your
            donations will help us maintain this project and achieve a brighter
            future for those without access to quality education and clean
            water.
          </>
        </div>
        <div className='sepp__donations-content'>
          <div className='sepp__donations-info'>
            <div className='sepp__donations-info-item'>
              <FaDonate className='sepp__donations-icon' />
              <h3>Make a Donation</h3>
              <>
                Every contribution, big or small, goes a long way in helping us
                reach our goals. Your support is invaluable to us.
              </>
            </div>
            <div className='sepp__donations-info-item'>
              <FaHandsHelping className='sepp__donations-icon' />
              <h3>Help Raise Awareness</h3>
              <>
                Spread the word about our mission and encourage others to join
                our cause. Together, we can make a significant impact.
              </>
            </div>
            <div className='sepp__donations-info-item'>
              <FaSchool className='sepp__donations-icon' />
              <h3>Future Vision</h3>
              <>
                The SEPP project aims to create a sustainable and advanced
                educational environment, paving the way for a futuristic world
                where every child has the opportunity to learn and grow.
              </>
            </div>
          </div>
          <div className='sepp__donations-form'>
            <h2>Donation Form</h2>
            <form>
              <div className='sepp__donations-form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' required />
              </div>
              <div className='sepp__donations-form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' required />
              </div>
              <div className='sepp__donations-form-group'>
                <label htmlFor='amount'>Donation Amount($)</label>
                <input type='number' id='amount' name='amount' required />
              </div>
              <div className='sepp__donations-form-group'>
                <label htmlFor='message'>Message</label>
                <textarea id='message' name='message' rows='5'></textarea>
              </div>
              <button type='submit' className='sepp__donations-form-button'>
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Donations
