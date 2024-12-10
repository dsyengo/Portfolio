import { FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';

const skills = [
  { icon: <FaNodeJs />, label: 'Node.js' },
  { icon: <FaPython />, label: 'Python' },
  { icon: <FaDatabase />, label: 'Databases' },
];

const Skills = () => (
  <section id="skills" className="bg-white py-10">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="flex justify-center space-x-10 mt-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-gray-700 hover:text-yellow-400 transition-colors"
          >
            <div className="text-4xl">{skill.icon}</div>
            <p>{skill.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
