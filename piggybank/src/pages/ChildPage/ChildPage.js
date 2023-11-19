import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemBox from '../../components/ItemBox/ItemBox';
import Balance from '../../components/Balance/Balance';
import Graph from '../../components/Graph/Graph';
import TaskList from '../../components/TaskList/TaskList';

function ChildPage() {
  const [itemData, setItemData] = useState({ item: '', price: 0 });
  const [balance, setBalance] = useState(0);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios.get('/api/item').then(response => setItemData(response.data));
    axios.get('/api/balance').then(response => setBalance(response.data));
    axios.get('/api/tasks').then(response => setTaskData(response.data));
  }, []);

  return (
    <div>
      <ItemBox item={itemData.item} price={itemData.price} />
      <Balance balance={balance} />
      <Graph data={itemData} />
      <TaskList tasks={taskData} />
    </div>
  );
}

export default ChildPage;
