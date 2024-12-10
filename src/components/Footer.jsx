import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaFacebook } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-6">
      {/* Navigation Links */}
      <div className="flex justify-center space-x-6 mb-4">
        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm hover:text-yellow-400 transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://github.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 transition-colors"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 transition-colors"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://twitter.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 transition-colors"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://wa.me/your-phone-number"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 transition-colors"
        >
          <FaWhatsapp size={20} />
        </a>
        <a
          href="https://facebook.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 transition-colors"
        >
          <FaFacebook size={20} />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Built with <span className="text-yellow-400">React</span>,{' '}
          <span className="text-yellow-400">Vite</span>, and{' '}
          <span className="text-yellow-400">Tailwind CSS</span>.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
