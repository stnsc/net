import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable detail page shell.
 * Renders a scrolling title band at the top, page content in the middle,
 * and a clickable "< BACK" scrolling band at the bottom.
 *
 * Bands are plain divs/buttons (not motion elements) so that CSS
 * transform: rotate(-12deg) is never overridden by framer-motion.
 */
export default function DetailPage({ label, onBack, children }) {
  const contentRef = useRef(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const updateMask = () => {
      const remaining = Math.max(0, content.scrollHeight - content.clientHeight - content.scrollTop)
      const fadeSize = Math.min(40, content.clientHeight / 4)
      content.style.setProperty('--scroll-fade-top', Math.min(fadeSize, Math.max(0, content.scrollTop)) + 'px')
      content.style.setProperty('--scroll-fade-bottom', Math.min(fadeSize, remaining) + 'px')
    }

    updateMask()
    content.addEventListener('scroll', updateMask, { passive: true })
    const observer = new ResizeObserver(updateMask)
    observer.observe(content)
    for (const child of content.children) observer.observe(child)

    return () => {
      content.removeEventListener('scroll', updateMask)
      observer.disconnect()
    }
  }, [children])

  const titleHalf = `${label.toUpperCase()} `.repeat(12)
  const backHalf  = '< BACK '.repeat(20)

  return (
    <motion.div
      className="detail-page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      <div className="detail-page">

        {/* Title band – top */}
        <div className="detail-band detail-band--top">
          <div className="band-track" style={{ '--speed': '60s' }}>
            {titleHalf}{titleHalf}
          </div>
        </div>

        {/* Content */}
        <motion.div
          ref={contentRef}
          className="detail-page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="section-content-background"/>
          {children}
        </motion.div>

        {/* Back band – bottom */}
        <button
          className="detail-band detail-band--bottom"
          onClick={onBack}
          aria-label="Go back"
        >
          <div className="band-track" style={{ '--speed': '50s' }}>
            {backHalf}{backHalf}
          </div>
        </button>

      </div>
    </motion.div>
  )
}
