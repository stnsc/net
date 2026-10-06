import { useState, useEffect, useRef } from 'react'
import {
  SiTypescript, SiReact, SiVite, SiFramer, SiCloudflare, SiNodedotjs,
  SiBootstrap, SiExpress, SiPostgresql, SiExpo, SiVercel, SiJavascript,
  SiCss, SiHtml5,
} from 'react-icons/si'
import { FiPenTool, FiFilm, FiCpu, FiCloud, FiGlobe, FiMusic, FiType, FiCode, FiArrowUpRight } from 'react-icons/fi'

// Defined projects list. 
// Supports either a text title or a custom logo component based on choosing.
const PROJECTS = [
  {
    id: 'status',
    title: 'status page',
    logo: null,
    subtitle: 'Side Project',
    description: 'A centralized status page for all my projects, providing real-time updates and notifications about their operational status.',
    video: null,
    image: '/projects/status.png',
    link: {
      title: 'Visit Website!',
      url: 'https://status.stnsc.net'
    },
    tags: ['TypeScript', 'React', 'Vite', 'Custom Endpoints']
  },
  {
    id: 'cloud',
    title: 'cloud.',
    logo: (
      <img src="/projects/cloud_logo.png" alt="cloud." />
    ),
    subtitle: 'Side Project',
    description: 'Project made to test out cloud storage capabilities. It is a limited access website that allows users to store and manage their files in the cloud.',
    video: '/projects/cloud.mp4',
    image: null,
    link: {
      title: 'Visit Website!',
      url: 'https://cloud.stnsc.net'
    },
    tags: ['TypeScript', 'React', 'Vite', 'framer-motion', 'Cloudflare R2, Workers, D1']
  },
  {
    id: 'ip',
    title: 'ip-intelligence',
    logo: null,
    subtitle: 'Side Project',
    description: 'It is a simple website that allows users to check IP addresses and phone numbers and get some basic information about it.',
    video: '/projects/ip.mp4',
    image: null,
    link: {
      title: 'Visit Website!',
      url: 'https://ip.stnsc.net'
    },
    tags: ['TypeScript', 'React', 'Vite', 'Various APIs (IPLogs, OpenStreetMap, CallTracer)']
  },
  {
    id: 'ae2',
    title: 'AutoService v2.0',
    logo: (
      <img src="/projects/as_logo.png" alt="AutoService v2.0 Logo" />
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
    id: 'mix',
    title: 'MIX ASSISTANT',
    logo: null,
    subtitle: 'Side Project',
    description: 'Project made for my music hobby. It is a website system that recommends music mixing based on tempo and pitch, with automatic adjustments.',
    video: '/projects/mix-assistant.mp4',
    image: null,
    link: {
      title: 'Visit Website!',
      url: 'https://mix-assistant.stnsc.net'
    },
    tags: ['TypeScript', 'React', 'Node.js', 'Vite', 'Essentia.js']
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
      url: 'https://stnsc.github.io/weather-app/'
  },
    tags: ['JavaScript', 'React', 'CSS', 'OpenWeatherMap API']
  },
  {
    id: 'nelexium',
    title: 'NELEXIUM',
    logo: (
      <img src="/projects/longtransparent.png" alt="NELEXIUM" />
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

const TECHNOLOGY_ICONS = {
  TypeScript: SiTypescript,
  React: SiReact,
  Vite: SiVite,
  'framer-motion': SiFramer,
  'Framer Motion': SiFramer,
  'Cloudflare R2, Workers, D1': SiCloudflare,
  Cloudflare: SiCloudflare,
  'Node.js': SiNodedotjs,
  'Essentia.js': FiMusic,
  Bootstrap: SiBootstrap,
  'Express.js': SiExpress,
  PostgreSQL: SiPostgresql,
  'React Native': SiReact,
  'Expo SDK': SiExpo,
  Vercel: SiVercel,
  'API AI Layers': FiCpu,
  'AWS (Cognito, DynamoDB, SES, SNS)': FiCloud,
  i18n: FiGlobe,
  JavaScript: SiJavascript,
  CSS: SiCss,
  'OpenWeatherMap API': FiCloud,
  'Adobe Illustrator': FiPenTool,
  FontForge: FiType,
  'Adobe After Effects': FiFilm,
  'Various APIs (IPLogs, OpenStreetMap, CallTracer)': FiGlobe,
  'Custom Endpoints': FiCode,
  HTML: SiHtml5,
}

function ProjectMedia({ project }) {
  const [mediaError, setMediaError] = useState(false)
  const videoRef = useRef(null)

  // Only animate previews that are visible in the scrolling project grid.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const updatePlayback = () => {
      if (visible && !reducedMotion.matches) video.play().catch(() => {})
      else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updatePlayback()
    }, { threshold: 0.15 })
    observer.observe(video)
    reducedMotion.addEventListener('change', updatePlayback)
    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', updatePlayback)
      video.pause()
    }
  }, [])

  return (
    <div className="project-media">
      {mediaError || (!project.video && !project.image) ? (
        <div className="project-media-fallback">Preview unavailable</div>
      ) : project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={project.title + ' preview'}
          onError={() => setMediaError(true)}
        />
      ) : (
        <img src={project.image} alt={project.title + ' preview'} loading="lazy" onError={() => setMediaError(true)} />
      )}
    </div>
  )
}

export default function Projects() {
  return (
    <div className="projects-grid">
      {PROJECTS.map((project) => (
        <article className="project-card" key={project.id} aria-labelledby={project.id + '-title'}>
          <ProjectMedia project={project} />
          <div className="project-card-body">
            <h3 className="project-title-text" id={project.id + '-title'} aria-label={project.title}>
              {project.logo ? <span className="project-title-logo" aria-hidden="true">{project.logo}</span> : project.title}
            </h3>
            <p className="project-desc">{project.description}</p>
            {project.link?.url && (
              <a href={project.link.url} target="_blank" rel="noopener noreferrer" className="project-link">
                {project.link.title} <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            <div className="project-tech-section">
              <ul className="project-technologies" aria-label="Technologies used">
                {project.tags.map((tag) => {
                  const Icon = TECHNOLOGY_ICONS[tag] || FiCode
                  return (
                    <li className="project-technology" key={tag}>
                      <button type="button" className="technology-icon" aria-label={tag}>
                        <Icon aria-hidden="true" />
                      </button>
                      <span className="technology-tooltip" aria-hidden="true">{tag}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
