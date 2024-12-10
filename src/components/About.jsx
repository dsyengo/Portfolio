import { motion } from 'framer-motion';

const About = () => (
  <section id="about" className="bg-gray-100 py-10">
    <div className="container mx-auto text-center">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        About Me
      </motion.h2>
      <p className="mt-4 text-gray-600">
        I am a backend developer, cybersecurity specialist, and AI/ML enthusiast passionate about solving problems with scalable and secure solutions.
      </p>
    </div>
  </section>
);

export default About;
