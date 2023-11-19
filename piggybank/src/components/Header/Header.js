import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../logo.png';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <a href="/"><img src={logo} alt="Logo" className="logo" /></a>
      <nav>
        <ul className="nav-links">
          {(location.pathname === '/child' || location.pathname === '/chat') && (
            <>
              <li><a href="/chat">Chat</a></li>
              <li><a href="/child">Savings</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

