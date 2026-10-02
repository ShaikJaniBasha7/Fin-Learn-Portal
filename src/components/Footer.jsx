import React from 'react';
import { DollarSign, Heart, Shield, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="flex items-center gap-2">
            <div className="brand-icon-sm">
              <DollarSign size={18} />
            </div>
            <span className="footer-title">FinSmart Portal</span>
          </div>
          <p className="footer-tagline">
            Empowering students with essential financial literacy, savings strategies, and smart budgeting tools.
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Quick Navigation</h4>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/learn">Learning Modules</Link></li>
            <li><Link to="/quiz">Knowledge Quiz</Link></li>
            <li><Link to="/calculators">Financial Tools</Link></li>
            <li><Link to="/my-finance">Budget Tracker</Link></li>
          </ul>
        </div>

        <div className="footer-info">
          <h4>College Assignment Project</h4>
          <p>Built with ReactJS, ES6+, HTML5 & CSS3.</p>
          <div className="footer-badge">
            <Shield size={14} /> 100% Client-Side Local Storage Saved
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FinSmart Personal Finance Learning Portal. Created for Student Assessment.</p>
      </div>
    </footer>
  );
};

export default Footer;
