import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Label } from 'recharts';
import "./Graph.css";

const Graph = () => {
  const [data, setData] = useState([]);
  const [initialBalance, setInitialBalance] = useState(0);
  const [monthlyAllowance, setMonthlyAllowance] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/get-total-balance')
      .then(response => response.json())
      .then(data => {
        const balance = data.total_balance || 0;
        setInitialBalance(parseFloat(balance));
      })
      .catch(error => console.error('Error fetching total balance:', error));

    fetch('http://localhost:8080/api/get-allowance')
      .then(response => response.json())
      .then(data => {
        const allowance = data.allowance || 0;
        setMonthlyAllowance(parseFloat(allowance));
      })
      .catch(error => console.error('Error fetching allowance:', error));

    fetch('http://localhost:8080/api/get-price')
      .then(response => response.json())
      .then(data => {
        const price = data.price || 0;
        setItemPrice(parseFloat(price));
      })
      .catch(error => console.error('Error fetching item price:', error));
  }, []);

  useEffect(() => {
    if (initialBalance && monthlyAllowance) {
      const projections = Array.from({ length: 12 }).map((_, index) => ({
        month: index + 1,
        balance: initialBalance + monthlyAllowance * index
      }));
      setData(projections);
    }
  }, [initialBalance, monthlyAllowance]);

  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, bottom: 30, left: 30 }}>
      <Line type="monotone" dataKey="balance" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="month">
        <Label value="Months" offset={-10} position="insideBottom" />
      </XAxis>
      <YAxis label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      {itemPrice && (
        <ReferenceLine y={itemPrice} label={`Item Price: $${itemPrice}`} stroke="red" strokeDasharray="3 3" />
      )}
    </LineChart>
  );
};
export default Graph;