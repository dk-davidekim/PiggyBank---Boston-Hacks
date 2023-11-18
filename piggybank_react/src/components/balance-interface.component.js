import React from 'react';

const BankBalanceDisplay = ({ balance }) => {
  return (
    <div className="bank-balance-display">
      Bank Balance: {balance}
    </div>
  );
};
export default BankBalanceDisplay;