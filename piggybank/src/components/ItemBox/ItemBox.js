function ItemBox({ item, price }) {
  // Function to format price as currency
  const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
      }).format(amount);
  };

  return (
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
          <p>Item: {item}</p>
          <p>Price: {formatCurrency(price)}</p>
      </div>
  );
}

export default ItemBox;
