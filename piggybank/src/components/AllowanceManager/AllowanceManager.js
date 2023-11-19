function AllowanceManager({ allowance, onAllowanceChange }) {
    const handleInputChange = (e) => {
      const newAllowance = e.target.value;
      onAllowanceChange(newAllowance);
    };
  
    return (
      <div>
        <h2>Set Monthly Allowance</h2>
        <input type="number" value={allowance} onChange={handleInputChange} />
        <p>Current Allowance: ${allowance}</p>
      </div>
    );
  }

export default AllowanceManager;