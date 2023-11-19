import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import myImage from '../../this.jpg'

function HomePage() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Parent') {
      fetch('http://localhost:8080/api/start-parent-session')
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error:', error));
    }
    navigate(`/${selectedRole.toLowerCase()}`);
  };

  return (
    <div className="home-page">
      <h1>Welcome! Please select your role:</h1>
      <button onClick={() => handleRoleSelect('Parent')}>Parent</button>
      <button onClick={() => handleRoleSelect('Child')}>Child</button>
      <img src={myImage} alt="Description" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}

export default HomePage;

