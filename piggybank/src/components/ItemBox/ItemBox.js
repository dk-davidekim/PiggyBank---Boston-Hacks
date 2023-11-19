function ItemBox({ item, price }) {
    return (
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        <p>Item: {item}</p>
        <p>Price: ${price}</p>
      </div>
    );
  }
  
export default ItemBox;