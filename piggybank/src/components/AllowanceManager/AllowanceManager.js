import React, { useState, useEffect } from 'react';

function AllowanceManager({ allowance, onAllowanceChange }) {
  const [newAllowance, setNewAllowance] = useState(allowance);

  useEffect(() => {
      // Update local state when the allowance prop changes
      setNewAllowance(allowance);
  }, [allowance]);

  const handleInputChange = (e) => {
      // Parse the input value as a number
      setNewAllowance(Number(e.target.value));
  };

  const handleSubmit = () => {
      // Trigger the allowance change with the new allowance value
      onAllowanceChange(newAllowance);
  };

  return (
      <div>
          <h2>Set Monthly Allowance</h2>
          <input type="number" value={newAllowance} onChange={handleInputChange} />
          <button onClick={handleSubmit}>Update Allowance</button>
          <p>Current Allowance: ${allowance}</p>
      </div>
  );
}

export default AllowanceManager;
