import React from 'react';

const BankBalanceDisplay = ({ balance }) => {
  return (
    <div className="bank-balance-display">
      Bank Balance: {balance}
    </div>
  );
};

export default BankBalanceDisplay; // This line exports the component as the default export
