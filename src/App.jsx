import './index.css'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { key: 'projects', name: 'Projects' },
  { key: 'work',     name: 'Experience' },
  { key: 'contact',  name: 'Contact' },
]

const fade = (active, delay = 0) =>
  active
    ? { opacity: 0, scale: 1.15, filter: 'blur(14px)', transition: { duration: 0.3, delay } }
    : { opacity: 1, scale: 1,    filter: 'blur(0px)',  transition: { duration: 0.35 } }

export default function App() {
  const wideRef   = useRef(null)
  const narrowRef = useRef(null)
  const [ended, setEnded]                 = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  function handleReplay() {
    setEnded(false)
    const ref = window.matchMedia('(max-aspect-ratio: 1/1)').matches ? narrowRef : wideRef
    if (ref.current) { ref.current.currentTime = 0; ref.current.play() }
  }

  function scrollToContent() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const activeLabel = SECTIONS.find(s => s.key === activeSection)?.name

  return (
    <div className="page">
      <section className="hero">
        <video ref={wideRef}   className="wide"   src="/hero_wide.mp4"   autoPlay muted playsInline onEnded={() => setEnded(true)} />
        <video ref={narrowRef} className="narrow" src="/hero_narrow.mp4" autoPlay muted playsInline onEnded={() => setEnded(true)} />
        {ended && (<><div className="strip-top" /><div className="strip-top diagonal" /></>)}
        {ended && (
          <div className="hero-overlay">
            <button className="replay-btn" onClick={handleReplay}>Replay</button>
          </div>
        )}
      </section>

      {ended && (
        <>
          <button className="scroll-prompt" onClick={scrollToContent} aria-label="Scroll down">
            <span className="strip-label">Scroll down</span>
          </button>
          <button className="scroll-prompt diagonal" onClick={scrollToContent} aria-label="Scroll down" />
        </>
      )}

      <section id="content" className="content-element">
        <div className="content-wrapper">

          {/* MENU LAYER – always mounted, items animate in-place, no layout shifts */}
          <div className="content-layer">
            <div className="intro">
              <div className="intro-greeting">
                <motion.h1 className="nelexium" animate={fade(activeSection, 0)}>
                  HELLO!
                </motion.h1>
              </div>
              <div className="intro-text">
                <motion.p animate={fade(activeSection, 0.04)}>
                  My name is Stanescu Vladut-George and I am a web developer.
                </motion.p>
                <motion.p animate={fade(activeSection, 0.08)}>
                  Click on any of the elements below to find out more about me:
                </motion.p>
              </div>
            </div>
            <div className="menu-items">
              {SECTIONS.map((section, i) =>
                activeSection === section.key ? null : (
                  <motion.h2
                    key={section.key}
                    layoutId={`nav-${section.key}`}
                    className="nelexium menu-item"
                    animate={fade(activeSection, 0.12 + i * 0.04)}
                    onClick={() => !activeSection && setActiveSection(section.key)}
                  >
                    <span className="menu-prefix">{'>'}</span>
                    {section.name}
                  </motion.h2>
                )
              )}
            </div>
          </div>

          {/* DETAIL LAYER – absolutely overlays the menu, no layout interaction */}
          <AnimatePresence>
            {activeSection && (
              <div key={activeSection} className="content-layer detail-layer">
                <motion.h2
                  layoutId={`nav-${activeSection}`}
                  className="nelexium detail-title"
                >
                  /{activeLabel}
                </motion.h2>

                <motion.button
                  className="back-btn nelexium"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.45, duration: 0.3 } }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  onClick={() => setActiveSection(null)}
                >
                  BACK
                </motion.button>

                <motion.div
                  className="detail-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <p>Placeholder Page Content</p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </div>
  )
}
