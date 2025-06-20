import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // importing icons
import './Footer.css'; // optional CSS for styling

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} Book Review Platform. All rights reserved.</p>
        <div className="social-icons">
          <a
            href="https://github.com/Posa5A6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/posa5a6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
