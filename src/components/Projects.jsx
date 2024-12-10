import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'CyberPolicy Pro',
    description: 'A compliance management system for businesses.',
    link: '#',
  },
  {
    title: 'AI Health Assistant',
    description: 'An AI-powered personal health assistant app.',
    link: '#',
  },
  {
    title: 'Student Clearance System',
    description: 'An online system for managing student clearances.',
    link: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio showcasing my skills and projects.',
    link: '#',
  },
];

const Projects = () => (
  <section id="projects" className="bg-gray-100 py-10">
    <div className="container mx-auto px-6">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-400"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <FaExternalLinkAlt className="text-gray-600 text-lg" />
            </div>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <a
              href={project.link}
              className="text-yellow-400 font-bold hover:underline"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
