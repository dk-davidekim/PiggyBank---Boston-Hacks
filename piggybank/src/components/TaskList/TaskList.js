function TaskList({ tasks }) {
    return (
      <div style={{ margin: '10px' }}>
        {tasks.map((task, index) => (
          <div key={index}>
            <p>Name: {task.name}</p>
            <p>Price: ${task.price}</p>
            <input type="checkbox" checked={task.isComplete} /> Completed
          </div>
        ))}
      </div>
    );
  }

export default TaskList;
  