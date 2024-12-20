import { motion } from 'framer-motion';
import { FaAward } from 'react-icons/fa';

const Achievements = () => {
  const achievements = [
    {
      title: 'CompTIA Security+ Certification',
      description:
        'Earned recognition for foundational cybersecurity knowledge and skills.',
      year: '2023',
    },
    {
      title: 'Certified Ethical Hacker (CEH)',
      description:
        'Certified in ethical hacking practices to identify and mitigate vulnerabilities.',
      year: '2024',
    },
    {
      title: 'TensorFlow Developer Certification',
      description:
        'Proven expertise in building and deploying AI/ML models using TensorFlow.',
      year: '2023',
    },
    {
      title: 'Winner - Hackathon 2022',
      description:
        'Developed a cybersecurity solution that won 1st place in a national hackathon.',
      year: '2022',
    },
  ];

  return (
    <section id="achievements" className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Achievements & Certifications
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-400"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
            >
              <div className="flex items-center mb-4">
                <FaAward className="text-yellow-400 text-2xl mr-4" />
                <h3 className="text-xl font-semibold">{achievement.title}</h3>
              </div>
              <p className="text-gray-700 mb-2">{achievement.description}</p>
              <span className="text-gray-500 text-sm italic">
                Year: {achievement.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
