import { motion } from 'framer-motion';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => (
  <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center p-4">
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        My Portfolio
      </motion.h1>
      <AiOutlineMenu className="text-2xl md:hidden cursor-pointer" />
      <nav className="hidden md:flex space-x-6">
        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-yellow-400 transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
