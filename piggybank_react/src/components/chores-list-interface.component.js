import React from 'react';

const ChoresList = ({ chores, markChoreAsPending }) => {
  return (
    <ul className="chores-list">
      {chores.map((chore, index) => (
        <li key={index}>
          {chore.name} - {chore.amount} - 
          <button onClick={() => markChoreAsPending(chore.id)}>Mark as Pending</button>
        </li>
      ))}
    </ul>
  );
};

export default ChoresList; // This line exports the component as the default export
