import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChoreList.css';

const ChoreList = () => {
    const [chores, setChores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-chores')
            .then(response => {
                setChores(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching chores:', error);
                setError('Failed to load chores.');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading chores...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="chore-list">
            <h2>Chores</h2>
            <ul>
                {chores.map(chore => (
                    <li key={chore.id}>
                        {chore.name} - ${chore.compensation}
                        <input type="checkbox" checked={chore.isComplete} readOnly />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChoreList;
