import React from 'react';
import './Header.css'; // Make sure to create a corresponding CSS file for styles
import logo from '../../logo.png';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      {/* <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav> */}
    </header>
  );
}

export default Header;
