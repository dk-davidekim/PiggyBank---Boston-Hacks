function ChoreManager({ chores, onChoreUpdate }) {
  const addChore = () => {
      const newChore = { name: 'New Chore', compensation: 0, isComplete: false };
      onChoreUpdate([...chores, newChore]);
  };

  const deleteChore = (index) => {
      const updatedChores = chores.filter((_, i) => i !== index);
      onChoreUpdate(updatedChores);
  };

  const toggleChoreStatus = (index) => {
      const updatedChores = chores.map((chore, i) =>
          i === index ? { ...chore, isComplete: !chore.isComplete } : chore
      );
      onChoreUpdate(updatedChores);
  };

  const updateChoreField = (index, field, value) => {
      const updatedChores = chores.map((chore, i) =>
          i === index ? { ...chore, [field]: value } : chore
      );
      onChoreUpdate(updatedChores);
  };

  return (
      <div>
          <h2>Manage Chores</h2>
          {chores.map((chore, index) => (
              <div key={`${chore.name}-${index}`}>
                  <input
                      type="text"
                      value={chore.name}
                      onChange={(e) => updateChoreField(index, 'name', e.target.value)}
                  />
                  <input
                      type="number"
                      value={chore.compensation}
                      onChange={(e) => updateChoreField(index, 'compensation', parseFloat(e.target.value))}
                  />
                  <input
                      type="checkbox"
                      checked={chore.isComplete}
                      onChange={() => toggleChoreStatus(index)}
                  /> Completed
                  <button onClick={() => deleteChore(index)}>Delete Chore</button>
              </div>
          ))}
          <button onClick={addChore}>Add New Chore</button>
      </div>
  );
}

export default ChoreManager;
