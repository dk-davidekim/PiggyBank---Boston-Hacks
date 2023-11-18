import React from 'react';

const ItemInput = ({ item, setItem, price, setPrice }) => {
  return (
    <div className="item-input">
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="What are you saving for?"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Item Price"
      />
    </div>
  );
};

export default ItemInput; // This line exports the component as the default export
