import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaReact, FaPython, FaNodeJs } from 'react-icons/fa';

const skills = [
  {
    title: 'JavaScript (Node.js)',
    description: 'Expert in building scalable backend solutions with Node.js.',
    icon: <FaNodeJs className="text-yellow-500 text-5xl" />,
  },
  {
    title: 'MERN Stack',
    description: 'Proficient in developing full-stack applications with MongoDB, Express, React, and Node.js.',
    icon: <FaReact className="text-blue-500 text-5xl" />,
  },
  {
    title: 'Python',
    description: 'Skilled in Python programming for data analysis and backend development.',
    icon: <FaPython className="text-green-500 text-5xl" />,
  },
  {
    title: 'Databases',
    description: 'Experienced with relational and non-relational databases like MySQL and MongoDB.',
    icon: <FaDatabase className="text-red-500 text-5xl" />,
  },
  {
    title: 'Version Control (Git)',
    description: 'Experienced in managing codebases and collaboration using Git and GitHub.',
    icon: <FaCode className="text-gray-600 text-5xl" />,
  },
];

const Skills = () => (
  <section id="skills" className="bg-gray-100 py-12">
    <div className="container mx-auto px-6">
      <motion.h2
        className="text-4xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Skills
      </motion.h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg p-8 text-center border-l-4 border-yellow-400 transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
            }}
          >
            <div className="mb-6 flex justify-center">{skill.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{skill.title}</h3>
            <p className="text-gray-600">{skill.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
