import React, { useState, useEffect } from 'react';
import AllowanceManager from '../../components/AllowanceManager/AllowanceManager';
import ChoreManager from '../../components/ChoreManager/ChoreManager';

function ParentPage() {
  const [allowance, setAllowance] = useState(0);
  const [chores, setChores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/get-allowance')
      .then(response => response.json())
      .then(data => {
        if (data.allowance) {
          setAllowance(data.allowance);
        }
      })
      .catch(error => console.error('Error fetching allowance:', error));

    fetch('http://localhost:5000/api/get-chores')
      .then(response => response.json())
      .then(data => setChores(data))
      .catch(error => console.error('Error fetching chores:', error));
  }, []);

  const handleAllowanceChange = newAllowance => {
    setAllowance(newAllowance);
    fetch('http://localhost:5000/api/insert-allowance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newAllowance }),
    });
  };

  const handleChoreUpdate = updatedChores => {
    setChores(updatedChores);
    updatedChores.forEach(chore => {
      fetch('http://localhost:5000/api/insert-chore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: chore.name,
          compensation: chore.compensation,
        }),
      });
    });
  };

  return (
    <div>
      <AllowanceManager allowance={allowance} onAllowanceChange={handleAllowanceChange} />
      <ChoreManager chores={chores} onChoreUpdate={handleChoreUpdate} />
    </div>
  );
}

export default ParentPage;
