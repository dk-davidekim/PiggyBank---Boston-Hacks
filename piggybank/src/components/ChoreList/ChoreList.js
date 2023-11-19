function ChoreList({ chores }) {
  // Function to format compensation as currency
  const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
      }).format(amount);
  };

  // Display message if there are no chores
  if (chores.length === 0) {
      return <p style={{ margin: '10px' }}>No chores to display.</p>;
  }

  return (
      <div style={{ margin: '10px' }}>
          {chores.map((chore, index) => (
              <div key={`${chore.name}-${index}`}> {/* Improved key */}
                  <p>Name: {chore.name}</p>
                  <p>Compensation: {formatCurrency(chore.compensation)}</p>
                  <input type="checkbox" checked={chore.isComplete} readOnly /> Completed
              </div>
          ))}
      </div>
  );
}

export default ChoreList;
