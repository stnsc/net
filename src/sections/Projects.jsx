import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Defined projects list. 
// Supports either a text title or a custom logo component based on choosing.
const PROJECTS = [
  {
    id: 'ae1',
    title: 'AutoService v1.0',
    logo: null,
    subtitle: 'Bachelors Project',
    description: 'Project made for my bachelors. It is a website system that allowed managing of various car service shops. ',
    video: '/projects/as1.webm',
    image: null,
    link: {
      title: 'Visit GitHub Repository',
      url: 'https://github.com/stnsc/AutoService-Website'
    },
    tags: ['TypeScript', 'React', 'Node.js', 'Vite', 'Bootstrap', 'Framer Motion', 'Express.js', 'PostgreSQL']
  },
  {
    id: 'ae2',
    title: 'AutoService v2.0',
    logo: (
      <div className="autoservice-logo">
        <img src="/projects/as_logo.png" alt="AutoService v2.0 Logo" className="project-logo" />
      </div>
    ),
    subtitle: 'The v2.0',
    description: 'Project made for my masters thesis. Expanded on the bachelors project, this version is a more advanced and modernized version of the AutoService system. It features a new design, added AI for fast car diagnosing, and a more robust backend made entirely with AWS.',
    video: '/projects/as2.webm',
    image: null,
    link: {
      title: 'Visit Website!',
      url: 'https://auto-service.app'
    },
    tags: ['TypeScript', 'React Native', 'Expo SDK', 'Vercel', 'Cloudflare', 'API AI Layers', 'AWS (Cognito, DynamoDB, SES, SNS)', 'i18n']
  },
  {
    id: 'weather',
    title: 'Weather App',
    logo: null,
    subtitle: 'Weather Forecasting',
    description: 'A simple weather forecasting app that provides real-time weather updates and forecasts for any location worldwide. It features a clean UI and uses the OpenWeatherMap API for accurate data.',
    video: '/projects/weatherapp.mp4',
    image: null,
    link: {
      title: 'Visit Website!',
      url: ''
  },
    tags: ['JavaScript', 'React', 'CSS', 'OpenWeatherMap API']
  },
  {
    id: 'nelexium',
    title: 'NELEXIUM',
    logo: (
      <div className="custom-logo nelexium-logo">
        <span className="logo-main nelexium">NELEXIUM.</span>
      </div>
    ),
    subtitle: 'TYPEFACE & BRAND IDENTITY',
    description: 'A futuristic custom typeface designed for digital interfaces and modular layouts. Features geometric alignments and high-contrast letterforms. Not publicly released yet.',
    video: '/projects/nelexium.mp4',
    image: null,
    link: null,
    tags: ['Adobe Illustrator', "FontForge"]
  },
  {
    id: 'aep',
    title: 'After Effects',
    logo: null,
    subtitle: 'MOTION DESIGN & ANIMATION',
    description: 'The videos you watched on this website were created using Adobe After Effects, with custom motion graphics, transitions, and visual effects.',
    video: null,
    image: '/projects/aep.png',
    link: null, 
    tags: ['Adobe After Effects']
  },
  {
    id: 'old',
    title: 'Old Website',
    logo: null,
    subtitle: 'OLD PORTFOLIO',
    description: 'This is my old portfolio website, which I used before creating this new one.',
    video: '/projects/old.mp4',
    image: null,
    link: {
      title: 'Visit Old Portfolio',
      url: 'https://stnsc.vercel.app/'
    },
    tags: ['HTML', 'CSS', 'JavaScript']
  }
]

// Framer motion variants for slide transitions
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    filter: 'blur(4px)'
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 260, damping: 28 },
      opacity: { duration: 0.25 },
      filter: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    filter: 'blur(4px)',
    transition: {
      x: { type: 'spring', stiffness: 260, damping: 28 },
      opacity: { duration: 0.2 },
      filter: { duration: 0.15 }
    }
  })
}

export default function Projects() {
  const [page, setPage] = useState([0, 0])
  const [mediaError, setMediaError] = useState(false)
  const [hasSwiped, setHasSwiped] = useState(false)

  const activeIndex = (page[0] % PROJECTS.length + PROJECTS.length) % PROJECTS.length
  const direction = page[1]
  const project = PROJECTS[activeIndex]

  // Reset media error when slide changes
  useEffect(() => {
    setMediaError(false)
  }, [activeIndex])

  const handleNext = () => {
    setPage([page[0] + 1, 1])
    setHasSwiped(true)
  }

  const handlePrev = () => {
    setPage([page[0] - 1, -1])
    setHasSwiped(true)
  }

  const handleDotClick = (index) => {
    const diff = index - activeIndex
    if (diff !== 0) {
      setPage([page[0] + diff, diff > 0 ? 1 : -1])
      setHasSwiped(true)
    }
  }

  return (
    <div className="projects-carousel-container">
      {/* Navigation Arrows - placed in padding areas using the Nelexium font */}
      <button 
        className="carousel-arrow carousel-arrow--left" 
        onClick={handlePrev} 
        aria-label="Previous project"
      >
        &lt;
      </button>
      <button 
        className="carousel-arrow carousel-arrow--right" 
        onClick={handleNext} 
        aria-label="Next project"
      >
        &gt;
      </button>

      {/* Main Slide Carousel Area */}
      <div className="carousel-slide-wrapper">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="projects-carousel-slide"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, info) => {
              const swipeThreshold = 50
              if (info.offset.x < -swipeThreshold) {
                handleNext()
              } else if (info.offset.x > swipeThreshold) {
                handlePrev()
              }
            }}
          >
            {/* Left side: Logo or Text Title based on choosing */}
            <div className="project-info-area">
              {project.logo ? (
                <div className="project-logo-wrapper">
                  {project.logo}
                </div>
              ) : (
                <h3 className="project-title-text">{project.title}</h3>
              )}
              
              {project.subtitle && (
                <span className="project-subtitle">{project.subtitle}</span>
              )}
              
              {project.description && (
                <p className="project-desc">{project.description}</p>
              )}
              
              {project.link && (
                <div className="project-link-wrapper">
                  <a 
                    href={project.link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                  >
                    {project.link.title} <span className="link-arrow">↗</span>
                  </a>
                </div>
              )}
              
              {project.tags && (
                <div className="project-tech-section">
                  <span className="tech-section-title">TECHNOLOGIES USED</span>
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <div key={idx} className="project-tag">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="project-video-slot">
              {!mediaError ? (
                project.video ? (
                  <video
                    key={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="project-video"
                  >
                    {/* HEVC with Alpha for Safari/macOS/iOS */}
                    <source 
                      src={project.video.replace('.webm', '.mp4')} 
                      type="video/mp4; codecs=hvc1" 
                    />
                    {/* VP9 with Alpha for Chrome/Firefox/Edge */}
                    <source 
                      src={project.video} 
                      type="video/webm" 
                      onError={() => setMediaError(true)}
                    />
                  </video>
                ) : project.image ? (
                  <img
                    key={project.image}
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    onError={() => setMediaError(true)}
                  />
                ) : (
                  <div className="project-video-fallback">
                    <div className="fallback-grid" />
                    <div className="fallback-overlay" />
                    <span className="fallback-text">NO MEDIA SPECIFIED</span>
                  </div>
                )
              ) : (
                <div className="project-video-fallback">
                  <div className="fallback-grid" />
                  <div className="fallback-overlay" />
                  <span className="fallback-text">FAILED TO LOAD MEDIA</span>
                  <span className="fallback-path">{project.video || project.image}</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom indicators: Square indices (gray inactive, white active) */}
      <div className="carousel-indicators">
        {PROJECTS.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to project slide ${index + 1}`}
          />
        ))}
      </div>

      {!hasSwiped && (
        <div className="carousel-swipe-hint">
          &larr; Swipe to explore &rarr;
        </div>
      )}
    </div>
  )
}
