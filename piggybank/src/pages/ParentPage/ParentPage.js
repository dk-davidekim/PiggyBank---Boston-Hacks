import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllowanceManager from '../../components/AllowanceManager/AllowanceManager';
import TaskManager from '../../components/TaskManager/TaskManager';

function ParentPage() {
  const [allowance, setAllowance] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/allowance').then(response => setAllowance(response.data));
    axios.get('/api/tasks').then(response => setTasks(response.data));
  }, []);

  const handleAllowanceChange = newAllowance => {
    setAllowance(newAllowance);
    axios.post('/api/update-allowance', { allowance: newAllowance });
  };

  const handleTaskUpdate = updatedTasks => {
    setTasks(updatedTasks);
    axios.post('/api/update-tasks', { tasks: updatedTasks });
  };

  return (
    <div>
      <AllowanceManager allowance={allowance} onAllowanceChange={handleAllowanceChange} />
      <TaskManager tasks={tasks} onTaskUpdate={handleTaskUpdate} />
    </div>
  );
}

export default ParentPage;
