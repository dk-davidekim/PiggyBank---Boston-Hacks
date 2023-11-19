function Balance({ balance }) {
  // Function to format balance as currency
  const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
      }).format(amount);
  };

  return (
      <div style={{ margin: '10px' }}>
          <p>Balance: {formatCurrency(balance)}</p>
      </div>
  );
}

export default Balance;
