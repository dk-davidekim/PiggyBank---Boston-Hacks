import React from 'react';

const SavingsDisplay = ({ item, price }) => {
  return (
    <div className="savings-display">
      Saving up for {price} dollar {item}
    </div>
  );
};

export default SavingsDisplay; // This line exports the component as the default export
