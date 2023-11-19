import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChoreManager = () => {
    const [chores, setChores] = useState([]);
    const [newChoreName, setNewChoreName] = useState('');
    const [newChoreCompensation, setNewChoreCompensation] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-chores')
            .then(response => setChores(response.data))
            .catch(error => console.error('Error fetching chores:', error));
        
        const intervalId = setInterval(() => {
            axios.get('http://localhost:8080/api/get-messages')
                .then(response => {
                    if (response.data.length > 0) {
                        setMessages(prevMessages => [...prevMessages, ...response.data]);
                    }
                })
                .catch(error => console.error('Error fetching messages:', error));
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleAddChore = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/insert-chore', { 
            name: newChoreName, 
            compensation: parseFloat(newChoreCompensation) || 0 
        })
        .then(() => {
            setChores([...chores, { name: newChoreName, compensation: newChoreCompensation, isComplete: false }]);
            setNewChoreName('');
            setNewChoreCompensation('');
        })
        .catch(error => console.error('Error adding chore:', error));
    };

    const handleCheckboxChange = (choreId) => {
        axios.post('http://localhost:8080/api/mark-chore-complete', { choreId })
            .then(() => {
                setChores(chores.map(chore => 
                    chore.id === choreId ? { ...chore, isComplete: true } : chore
                ));
            })
            .catch(error => console.error('Error marking chore complete:', error));
    };

    return (
        <div className="chore-manager">
            <h2>Chore Manager</h2>
            <ul>
                {chores.map((chore, index) => (
                    <li key={index}>
                        {chore.name} - ${chore.compensation}
                        <input 
                            type="checkbox" 
                            checked={chore.isComplete} 
                            onChange={() => handleCheckboxChange(chore.id)} 
                            disabled={chore.isComplete}
                        />
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
            <div className="messages">
                <h3>Messages:</h3>
                <ul>
                    {messages.map((msg, index) => {
                        const messageContent = JSON.parse(msg).message;
                        return <li key={index}>{messageContent}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ChoreManager;