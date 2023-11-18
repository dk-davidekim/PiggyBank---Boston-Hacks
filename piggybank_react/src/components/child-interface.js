import React, { useState } from 'react';
import GPTInterface from './gpt-interface.component';
import ItemPriceInterface from './item-price-interface.component';
import SavingsInterface from './savings-interface.component';
import BalanceInterface from './balance-interface.component';
import BalanceGraphInterface from './balance-graph-interface.component';
import ChoresListInterface from './chores-list-interface.component';
import ChoresCheckboxInterface from './chores-checkbox-interface.component';

const ChildInterface = () => {
  // Example state variables you might need
  const [balance, setBalance] = useState(0);
  const [chores, setChores] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState({ item: '', price: 0 });

  // Handlers to update state
  const handleAddChore = (chore) => {
    setChores([...chores, chore]);
  };

  // ... other handlers for updating balance, savings goal, etc.

  return (
    <div>
      <GPTInterface />
      <ItemPriceInterface savingsGoal={savingsGoal} setSavingsGoal={setSavingsGoal} />
      <SavingsInterface savingsGoal={savingsGoal} />
      <BalanceInterface balance={balance} />
      <BalanceGraphInterface balance={balance} chores={chores} />
      <ChoresListInterface chores={chores} handleAddChore={handleAddChore} />
      {chores.map((chore) => (
        <ChoresCheckboxInterface key={chore.id} chore={chore} setChores={setChores} />
      ))}
    </div>
  );
};

export default ChildInterface;
