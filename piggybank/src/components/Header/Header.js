import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './Header.css'; // Adjust the path as necessary
import logo from '../../logo.png'; // Adjust the path as necessary

function Header() {
  const location = useLocation(); // Get the current location

  return (
    <header className="header">
      <a href="/"><img src={logo} alt="Logo" className="logo" /></a>
      <nav>
        <ul className="nav-links">
          {location.pathname === '/child' && (
            <>
              <li><a href="/chat">ChatBot</a></li>
              <li><a href="/child">Savings</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
