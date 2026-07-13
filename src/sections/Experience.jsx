import { motion } from 'framer-motion'

const WORK_EXPERIENCE = [
  {
    title: 'TECHNICAL SUPPORT, AOL/YAHOO - CGS Romania',
    duration: 'Jan 2024 - Present',
    description: 'Helping users through the platform Salesforce to fix and enhance their experience through email support. Helped thousands of user with their account issues, handled account security and compromise cases, and provided solutions to technical problems. Collaborated with cross-functional teams to improve support processes and enhance user satisfaction.'
  }
]

const EDUCATION = [
  {
    title: 'Master of Internet Technologies (in English)',
    duration: 'Oct 2024 - Jul 2026',
    description: 'Focused on various web systems: web development, testing, database administration. Thesis project: Auto Service: An AI-Powered Automotive Service Platform for Romanian Markets.'
  },
  {
    title: 'Bachelor of Science in Computer Science',
    duration: 'Oct 2021 - Jul 2024',
    description: 'Specialized in core software engineering, databases, and web technologies. Thesis project: AutoService v1.0.'
  }
]

const EXTRA_CLASSES = [
  {
    title: 'SPECIALTY PRACTICE, ROWEB DEVELOPMENT, PITEȘTI',
    duration: 'July 2023 - August 2023',
    description: 'Detailed study of serverless computing architectures (Lambda, API Gateway, DynamoDB), IAM security, and cloud scalability principles.'
  },
  {
    title: 'ENDAVA4STUDENTS COURSE',
    duration: 'October 2023 - February 2024',
    description: 'Learning about Web Development Technologies and practices, Java fundamentals, PostgreSQL, HTML, CSS, JavaScript, React.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 28
    }
  }
}

export default function Experience() {
  return (
    <motion.div 
      className="experience-container"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 1. Work Experience Section */}
      <div className="experience-section">
        {WORK_EXPERIENCE.map((item, idx) => (
          <motion.div key={`work-${idx}`} className="experience-card" variants={cardVariants}>
            <div className="experience-card-header">
              <h4 className="experience-card-title">{item.title}</h4>
              <span className="experience-card-duration">{item.duration}</span>
            </div>
            <p className="experience-card-desc">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="experience-divider" />

      {/* 2. Education Section */}
      <div className="experience-section">
        {EDUCATION.map((item, idx) => (
          <motion.div key={`edu-${idx}`} className="experience-card" variants={cardVariants}>
            <div className="experience-card-header">
              <h4 className="experience-card-title">{item.title}</h4>
              <span className="experience-card-duration">{item.duration}</span>
            </div>
            <p className="experience-card-desc">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="experience-divider" />

      {/* 3. Extra Classes Section */}
      <div className="experience-section">
        {EXTRA_CLASSES.map((item, idx) => (
          <motion.div key={`class-${idx}`} className="experience-card" variants={cardVariants}>
            <div className="experience-card-header">
              <h4 className="experience-card-title">{item.title}</h4>
              <span className="experience-card-duration">{item.duration}</span>
            </div>
            <p className="experience-card-desc">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
