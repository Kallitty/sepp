import React from 'react'
import './privacypolicy.scss'
import Footer from '../footer/Footer'

const PrivacyPolicy = () => {
  return (
    <>
      <div className='privacy-policy'>
        <header className='privacy-policy__header'>
          <h1 className='privacy-policy__title'>Privacy Policy</h1>
          <p className='privacy-policy__effective-date'>
            {/* Effective: {new Date().toLocaleDateString()} */}
          </p>
        </header>

        <main className='privacy-policy__content'>
          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>
              1. Information We Collect
            </h2>
            <p className='privacy-policy__paragraph'>
              We collect personal information you provide directly, including:
            </p>
            <ul className='privacy-policy__list'>
              <li className='privacy-policy__list-item'>
                Name, email, and contact details when registering
              </li>
              <li className='privacy-policy__list-item'>
                Profile information and preferences
              </li>
              <li className='privacy-policy__list-item'>
                Payment information for premium services
              </li>
              <li className='privacy-policy__list-item'>
                Usage data and analytics
              </li>
            </ul>
          </section>

          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>
              2. How We Use Your Information
            </h2>
            <p className='privacy-policy__paragraph'>
              We use collected information to:
            </p>
            <ul className='privacy-policy__list'>
              <li className='privacy-policy__list-item'>
                Provide and maintain our services
              </li>
              <li className='privacy-policy__list-item'>
                Improve user experience
              </li>
              <li className='privacy-policy__list-item'>
                Process transactions
              </li>
              <li className='privacy-policy__list-item'>
                Communicate with you
              </li>
              <li className='privacy-policy__list-item'>
                Ensure platform security
              </li>
            </ul>
          </section>
          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>
              3. Data Sharing and Disclosure
            </h2>
            <p className='privacy-policy__paragraph'>
              We do not sell your personal data. We may share information with:
            </p>
            <ul className='privacy-policy__list'>
              <li className='privacy-policy__list-item'>
                Service providers assisting our operations
              </li>
              <li className='privacy-policy__list-item'>
                Legal authorities when required by law
              </li>
              <li className='privacy-policy__list-item'>
                Affiliates and subsidiaries
              </li>
              <li className='privacy-policy__list-item'>
                During business transfers or mergers
              </li>
            </ul>
          </section>
          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>4. Data Security</h2>
            <p className='privacy-policy__paragraph'>
              We implement industry-standard security measures including:
            </p>
            <ul className='privacy-policy__list'>
              <li className='privacy-policy__list-item'>
                Encryption of sensitive data
              </li>
              <li className='privacy-policy__list-item'>Access controls</li>
              <li className='privacy-policy__list-item'>
                Secure server infrastructure
              </li>
            </ul>
          </section>

          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>
              5. Cookies and Tracking
            </h2>
            <p className='privacy-policy__paragraph'>
              We use cookies and similar technologies to:
            </p>
            <ul className='privacy-policy__list'>
              <li className='privacy-policy__list-item'>Authenticate users</li>
              <li className='privacy-policy__list-item'>
                Remember preferences
              </li>
              <li className='privacy-policy__list-item'>
                Analyze site traffic
              </li>
              <li className='privacy-policy__list-item'>
                Deliver targeted content
              </li>
            </ul>
            <p>You can manage cookie preferences in your browser settings.</p>
          </section>

          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>6. User Rights</h2>
            <p className='privacy-policy__paragraph'>You have the right to:</p>
            <ul className='privacy-policy__list'>
              <li className='privacy-policy__list-item'>
                Access your personal data
              </li>
              <li className='privacy-policy__list-item'>
                Request correction or deletion
              </li>
              <li className='privacy-policy__list-item'>
                Object to processing
              </li>
              <li className='privacy-policy__list-item'>
                Request data portability
              </li>
              <li className='privacy-policy__list-item'>Withdraw consent</li>
            </ul>
          </section>
          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>
              7. International Data Transfers
            </h2>
            <p className='privacy-policy__paragraph'>
              Your information may be transferred to and processed in countries
              other than your own, with appropriate safeguards in place.
            </p>
            <ul className='privacy-policy__list'></ul>
          </section>
          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>8. Policy Changes</h2>
            <p className='privacy-policy__paragraph'>
              We may update this policy periodically. Material changes will be
              notified through our platform or via email.
            </p>
            <ul className='privacy-policy__list'></ul>
          </section>

          <section className='privacy-policy__section'>
            <h2 className='privacy-policy__section-title'>
              9. Contact Information
            </h2>
            <p className='privacy-policy__paragraph'>
              For privacy-related inquiries, contact our Data Protection Officer
              at:
              <br />
              <a
                href='mailto:support@seppedu.com'
                className='privacy-policy__link'
              >
                support@seppedu.com
              </a>
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy
