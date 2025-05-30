import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Contact = () => (
  <section id="contact" className="bg-white py-10">
    <div className="container mx-auto text-center">
      <motion.h2
        className="text-3xl font-bold"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Get In Touch
      </motion.h2>
      <p className="text-gray-600 my-4tracking-tighter">
        Feel free to reach out via email or connect with me on social media.
      </p>

      <form
        className="mt-6 space-y-4 max-w-lg mx-auto"
        action="https://formspree.io/f/{your-endpoint}"
        method="POST"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div>
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="bg-yellow-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </form>

      <div className="flex justify-center space-x-6 mt-8">
        <a
          href="www.linkedin.com/in/dsyengo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 text-2xl hover:text-yellow-400 transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/dsyengp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 text-2xl hover:text-yellow-400 transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="mailto:deniswilson028@gmail.com"
          className="text-gray-700 text-2xl hover:text-yellow-400 transition-colors"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
