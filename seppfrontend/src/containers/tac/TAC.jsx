import React from 'react'
import './tac.scss'
import Footer from '../footer/Footer'

const TAC = () => {
  return (
    <>
      <div className='legal-document'>
        <div className='legal-header'>
          <h1>Terms and Conditions</h1>
          <p className='effective-date'>
            {/* Effective: {new Date().toLocaleDateString()} */}
          </p>
        </div>

        <div className='legal-content'>
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to SEPP ("Company", "we", "our", "us"). These Terms and
              Conditions ("Terms") govern your use of our website located at
              sepp.com ("Site") and our services.
            </p>
          </section>

          <section>
            <h2>2. Acceptance of Terms</h2>
            <p>
              By accessing or using the Site, you agree to be bound by these
              Terms. If you disagree with any part, you may not access the Site.
            </p>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>
              When you create an account, you must provide accurate information.
              You are responsible for maintaining the confidentiality of your
              account and password.
            </p>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              The Site and its original content, features, and functionality are
              owned by SEPP and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2>5. Prohibited Uses</h2>
            <p>You may not use the Site:</p>
            <ul>
              <li>For any unlawful purpose</li>
              <li>To harass, abuse, or harm others</li>
              <li>To violate any regulations or laws</li>
              <li>To upload or transmit viruses</li>
            </ul>
          </section>

          <section>
            <h2>6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately for any
              reason, including without limitation if you breach these Terms.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall SEPP be liable for any indirect, incidental,
              special, consequential or punitive damages resulting from your use
              of the Site.
            </p>
          </section>

          <section>
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Your
              continued use constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of [Your Country/State]
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              For questions about these Terms, contact us at:
              support@seppedu.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TAC
