import { motion } from 'framer-motion';

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
];

const Projects = () => (
  <section id="projects" className="bg-gray-100 py-10">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <a
              href={project.link}
              className="text-blue-500 hover:underline mt-2 block"
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
