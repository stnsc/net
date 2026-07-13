import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else if (type === 'phone') {
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      }
    })
  }

  return (
    <motion.div 
      className="contact-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="contact-header">
        <span className="contact-subtitle">GET IN TOUCH</span>
        <p className="contact-flare">
          Have an idea, project, or opportunity you'd like to discuss? 
          Reach out directly, and let's create something together.
        </p>
      </div>

      {/* Email Card */}
      <a href="mailto:vlad@stnsc.net" className="contact-card">
        <div className="contact-card-top">
          <span className="contact-label">EMAIL ADDRESS</span>
          <button 
            className="contact-copy-btn" 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              copyToClipboard('vlad@stnsc.net', 'email')
            }}
            aria-label="Copy email address"
          >
            {copiedEmail ? 'COPIED ✓' : 'COPY'}
          </button>
        </div>
        <div className="contact-value">
          vlad@stnsc.net <span className="contact-arrow">↗</span>
        </div>
      </a>

      {/* Phone Card */}
      <a href="tel:+40751870213" className="contact-card">
        <div className="contact-card-top">
          <span className="contact-label">PHONE NUMBER</span>
          <button 
            className="contact-copy-btn" 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              copyToClipboard('+40751870213', 'phone')
            }}
            aria-label="Copy phone number"
          >
            {copiedPhone ? 'COPIED ✓' : 'COPY'}
          </button>
        </div>
        <div className="contact-value">
          +40751870213 <span className="contact-arrow">↗</span>
        </div>
      </a>
    </motion.div>
  )
}
