import React from 'react';

const AllowanceInput = ({ allowance, setAllowance }) => {
  return (
    <input
      type="number"
      value={allowance}
      onChange={(e) => setAllowance(Number(e.target.value))}
      placeholder="Monthly Allowance"
    />
  );
};
export default AllowanceInput;
