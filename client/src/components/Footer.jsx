import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiTwitter, FiLinkedin } from 'react-icons/fi';
import './Footer.css';
import lssLogo from '../assets/lss-logo.png'; // Assuming your logo is here

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        {/* --- Main Footer Content Grid --- */}
        <div className="footer-grid">
          {/* Column 1: Brand & Motto */}
          <div className="footer-column brand-column">
            <Link to="/" className="footer-logo">
              <img src={lssLogo} alt="LSS UNILORIN Crest" />
              <div className="logo-text">
                <span>Law Students' Society</span>
                <span>University of Ilorin</span>
              </div>
            </Link>
            <p className="footer-motto">“Salus Populi Suprema Lex.”</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/news">News & Publications</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="footer-column">
            <h4>Get in Touch</h4>
            <ul>
              <li className="contact-item">
                <FiMail />
                <a href="mailto:lawstudentsociety@gmail.com">lawstudentsociety@gmail.com</a>
              </li>
              {/* You could add more contact info here if needed */}
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="footer-social-links">
              <a href="https://x.com/unilawrin_" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X"><FiTwitter /></a>
              <a href="https://www.linkedin.com/in/law-students-society-unilorin-9601411aa/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn"><FiLinkedin /></a>
            </div>
          </div>
        </div>

        {/* --- Sub-Footer with Copyright and Credit --- */}
        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} Law Students' Society, UNILORIN. All Rights Reserved.</p>
          <p className="credit">
            Powered by <a href="https://x.com/Don_ugob" target="_blank" rel="noopener noreferrer">BUILD WITH UGO.B</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;