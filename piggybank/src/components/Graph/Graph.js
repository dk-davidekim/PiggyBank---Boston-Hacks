import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
  ResponsiveContainer, Legend
} from 'recharts';

const Graph = () => {
  const [data, setData] = useState([]);
  const monthlyAllowance = 4; // No need for a state if this doesn't change
  const itemPrice = 20; // No need for a state if this doesn't change
  const [intersection, setIntersection] = useState(null);

  useEffect(() => {
    // Calculate the balance for each month and find the intersection
    const balanceData = Array.from({ length: 12 }).map((_, index) => {
      const balance = monthlyAllowance * (index + 1);
      return { month: index + 1, balance };
    });

    setData(balanceData);

    // Find intersection point
    const firstIntersection = balanceData.find(entry => entry.balance >= itemPrice);
    setIntersection(firstIntersection);

  }, []); // No dependencies needed here since the values are hardcoded for testing

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="balance" stroke="#82ca9d" strokeWidth={2} dot={{ fill: '#82ca9d' }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="month" tick={{ fill: 'var(--primary-color)' }} />
        <YAxis tickFormatter={value => `$${value}`} />
        <Tooltip formatter={value => `$${value}`} />
        <ReferenceLine y={itemPrice} label={`Item Price: $${itemPrice}`} stroke="#f53e3e" strokeDasharray="3 3" />
        <Legend />
        {intersection && (
          <text x={50} y={90} fill="#ff7300">{`Intersection at month: ${intersection.month}`}</text>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
