import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">💰 FinLearn Portal</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/learn" className={location.pathname === '/learn' ? 'active' : ''}>Learn</Link>
        </li>
        <li>
          <Link to="/quiz" className={location.pathname === '/quiz' ? 'active' : ''}>Quiz</Link>
        </li>
        <li>
          <Link to="/calculator" className={location.pathname === '/calculator' ? 'active' : ''}>Calculator</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
