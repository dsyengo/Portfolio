import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import logo from "../assets/passport 100kb.jpg";

const Hero = () => (
  <section
    id="home"
    className="bg-gray-900 text-white min-h-screen flex items-center"
  >
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src={logo}
          alt="Denis Syengo"
          // className="w-full lg:w-1/2 lg:p-8 flex justify-center"
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-yellow-400 shadow-lg"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Denis Syengo
        </motion.h1>
        <p className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
          Secure Software Developer | Cybersecurity-Focused Engineer | AI/ML
          Enthusiast
        </p>
        <p className="mt-4 text-gray-300 tracking-tighter">
          Nicknamed &quot;<span className="text-yellow-400">Master Chief</span>
          &quot; for my disciplined and strategic approach, I specialize in
          secure backend development, cybersecurity, and AI-driven solutions. I
          bring precision and purpose to every project I tackle.
          <br />
          Beyond tech, I’m also a chorister and choir trainer, blending
          creativity with structure in both code and music.
        </p>

        {/* Call to Action */}
        <div className="mt-6">
          <a
            href="#projects"
            className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="ml-4 bg-transparent border border-yellow-400 text-yellow-400 px-6 py-2 rounded-lg shadow-md hover:bg-yellow-500 hover:text-gray-900 transition-colors"
          >
            Contact Me
          </a>
        </div>

        {/* Arrow Icon */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <FaArrowDown className="text-yellow-400 text-3xl animate-bounce" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
