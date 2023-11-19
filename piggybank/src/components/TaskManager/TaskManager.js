function TaskManager({ tasks, onTaskUpdate }) {
    const addTask = () => {
      const newTask = { name: 'New Task', price: 0, isComplete: false };
      onTaskUpdate([...tasks, newTask]);
    };
  
    const deleteTask = (index) => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      onTaskUpdate(updatedTasks);
    };
  
    const toggleTaskStatus = (index) => {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, isComplete: !task.isComplete } : task
      );
      onTaskUpdate(updatedTasks);
    };
  
    return (
      <div>
        <h2>Manage Tasks</h2>
        {tasks.map((task, index) => (
          <div key={index}>
            <p>Name: {task.name}</p>
            <p>Price: ${task.price}</p>
            <input type="checkbox" checked={task.isComplete} onChange={() => toggleTaskStatus(index)} /> Completed
            <button onClick={() => deleteTask(index)}>Delete Task</button>
          </div>
        ))}
        <button onClick={addTask}>Add New Task</button>
      </div>
    );
  }
  
export default TaskManager;