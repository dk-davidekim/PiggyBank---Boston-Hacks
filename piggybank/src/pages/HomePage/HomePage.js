import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import your CSS for styling

function HomePage() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    navigate(`/${selectedRole.toLowerCase()}`);
  };

  return (
    <div className="home-page">
      <h1>Welcome! Please select your role:</h1>
      <button onClick={() => handleRoleSelect('Parent')}>Parent</button>
      <button onClick={() => handleRoleSelect('Child')}>Child</button>
    </div>
  );
}

export default HomePage;
