import React from 'react';

const ChoreCheckbox = ({ chore, updateChoreStatus }) => {
  const handleCheckboxChange = () => {
    // Update the status of the chore based on current status
    // For example, from 'incomplete' to 'pending'
    updateChoreStatus(chore.id);
  };

  return (
    <div className="chore-checkbox">
      <label>
        <input type="checkbox" checked={chore.status === 'complete'} onChange={handleCheckboxChange} />
        {chore.name}
      </label>
    </div>
  );
};

export default ChoreCheckbox; // This line exports the component as the default export
