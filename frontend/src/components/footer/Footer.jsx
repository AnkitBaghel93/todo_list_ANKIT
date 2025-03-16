import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <h3 className="footer-brand">DooBeeDoo</h3>
        <p className="footer-text">
          Organize your work and life seamlessly with <span className="brand-highlight">DooBeeDoo</span>.  
          Your smart task manager for productivity and success.
        </p>
        <ul className="footer-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <p className="footer-credit">© {new Date().getFullYear()} DooBeeDoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
