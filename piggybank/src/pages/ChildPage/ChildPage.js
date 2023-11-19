import React, { useState, useEffect } from 'react';
import ItemBox from '../../components/ItemBox/ItemBox';
import Balance from '../../components/Balance/Balance';
import Graph from '../../components/Graph/Graph';
import ChoreList from '../../components/ChoreList/ChoreList';

function ChildPage() {
  const [itemData, setItemData] = useState({ item: '', price: 0 });
  const [balance, setBalance] = useState(0);
  const [choreData, setChoreData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/get-item')
      .then(response => response.json())
      .then(data => setItemData(data))
      .catch(error => console.error('Error fetching item data:', error));

    fetch('http://localhost:5000/api/get-total-balance')
      .then(response => response.json())
      .then(data => setBalance(data))
      .catch(error => console.error('Error fetching balance data:', error));

    fetch('http://localhost:5000/api/get-chores')
      .then(response => response.json())
      .then(data => setChoreData(data))
      .catch(error => console.error('Error fetching chores data:', error));
  }, []);

  return (
    <div>
      <ItemBox item={itemData.item} price={itemData.price} />
      <Balance balance={balance} />
      <Graph data={itemData} />
      <ChoreList chores={choreData} />
    </div>
  );
}

export default ChildPage;
