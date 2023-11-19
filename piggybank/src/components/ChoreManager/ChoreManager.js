import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChoreManager.css';
const ChoreManager = () => {
    const [chores, setChores] = useState([]);
    const [newChoreName, setNewChoreName] = useState('');
    const [newChoreCompensation, setNewChoreCompensation] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-chores')
            .then(response => setChores(response.data))
            .catch(error => console.error('Error fetching chores:', error));
    }, []);

    const handleAddChore = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/insert-chore', { 
            name: newChoreName, 
            compensation: newChoreCompensation 
        })
        .then(() => {
            setChores([...chores, { name: newChoreName, compensation: newChoreCompensation, isComplete: false }]);
            setNewChoreName('');
            setNewChoreCompensation('');
        })
        .catch(error => console.error('Error adding chore:', error));
    };

    return (
        <div className="chore-manager">
            <h2>Chore Manager</h2>
            <ul>
                {chores.map((chore, index) => (
                    <li key={index}>
                        {chore.name} - ${chore.compensation}
                        <input type="checkbox" checked={chore.isComplete} readOnly />
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddChore}>
                <input 
                    type="text" 
                    value={newChoreName} 
                    onChange={(e) => setNewChoreName(e.target.value)} 
                    placeholder="Chore name" 
                />
                <input 
                    type="number" 
                    value={newChoreCompensation} 
                    onChange={(e) => setNewChoreCompensation(e.target.value)} 
                    placeholder="Compensation" 
                />
                <button type="submit">Add Chore</button>
            </form>
        </div>
    );
};

export default ChoreManager;
