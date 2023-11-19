import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

const Graph = () => {
  const [data, setData] = useState([]);
  const [monthlyAllowance, setMonthlyAllowance] = useState(0);
  const [itemPrice, setItemPrice] = useState(null);

  useEffect(() => {
    // Fetch total balance
    fetch('http://localhost:8080/api/get-total-balance')
      .then(response => response.json())
      .then(balanceData => {
        const initialBalance = balanceData.total_balance || 0;

        // Fetch allowance
        fetch('http://localhost:8080/api/get-allowance')
          .then(response => response.json())
          .then(allowanceData => {
            if (allowanceData.allowance) {
              setMonthlyAllowance(allowanceData.allowance);
              const projections = Array.from({ length: 12 }).map((_, index) => ({
                month: index + 1,
                balance: initialBalance + allowanceData.allowance * index
              }));
              setData(projections);
            }
          })
          .catch(error => console.error('Error fetching allowance:', error));
      })
      .catch(error => console.error('Error fetching total balance:', error));

    // Fetch item price
    fetch('http://localhost:8080/api/get-item')
      .then(response => response.json())
      .then(itemData => {
        if (itemData.price) {
          setItemPrice(itemData.price);
        }
      })
      .catch(error => console.error('Error fetching item price:', error));
  }, []);

  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="balance" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      {itemPrice && (
        <ReferenceLine y={itemPrice} label={`Item Price: $${itemPrice}`} stroke="red" strokeDasharray="3 3" />
      )}
    </LineChart>
  );
};

export default Graph;
