import './index.css'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DetailPage from './components/DetailPage'
import Projects   from './sections/Projects'
import Experience from './sections/Experience'
import Contact    from './sections/Contact'

const SECTIONS = [
  { key: 'projects', name: 'Projects',        Component: Projects   },
  { key: 'work',     name: 'Work&Experience', Component: Experience },
  { key: 'contact',  name: 'Contact',         Component: Contact    },
]

// Different speeds create parallax effect between bands
const BAND_SPEEDS = ['100s', '150s', '125s']

const fade = (active, delay = 0) =>
  active
    ? { opacity: 0, scale: 1.15, transition: { duration: 0.3, delay } }
    : { opacity: 1, scale: 1,    transition: { duration: 0.35 } }



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

  const activeData = SECTIONS.find(s => s.key === activeSection)

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

          {/* INTRO LAYER */}
          <div className="content-layer intro-layer">
            <div className="intro">
              <div className="intro-greeting">
                <motion.h1 className="nelexium" animate={fade(activeSection, 0)}>
                  HELLO!
                </motion.h1>
              </div>
              <div className="intro-text">
                <motion.p animate={fade(activeSection, 0.04)}>
                  My name is Stanescu Vladut-George and I am a web developer & motion designer.
                </motion.p>
                <motion.p animate={fade(activeSection, 0.08)}>
                  Click on any of the elements below to find out more about me:
                </motion.p>
                <motion.p animate={fade(activeSection, 0.08)}>
                  Not yet fully polished on mobile, sorry!
                </motion.p>
              </div>
            </div>
          </div>

          {/* SCROLLING MENU BANDS */}
          <div className="menu-bands">
            {SECTIONS.map((section, i) => {
              /* Repeat label enough times so one copy exceeds any viewport width.
                 Two copies in total: animation goes from translateX(-50%) → 0,
                 which shifts the track by exactly one copy width */
              const label = `${section.name.toUpperCase()} `
              const half  = label.repeat(12)
              return (
                <button
                  key={section.key}
                  className={`menu-band ${activeSection ? 'hidden-band' : ''}`}
                  style={{ 
                    '--speed': BAND_SPEEDS[i],
                    transitionDelay: activeSection ? `${0.08 + i * 0.06}s` : '0s'
                  }}
                  onClick={() => !activeSection && setActiveSection(section.key)}
                  aria-label={`Go to ${section.name}`}
                  disabled={!!activeSection}
                >
                  <div className="band-track">{half}{half}</div>
                </button>
              )
            })}
          </div>

          {/* DETAIL PAGE */}
          <AnimatePresence>
            {activeSection && activeData && (
              <DetailPage
                key={activeSection}
                label={activeData.name}
                onBack={() => setActiveSection(null)}
              >
                <activeData.Component />
              </DetailPage>
            )}
          </AnimatePresence>

        </div>
      </section>
    </div>
  )
}
