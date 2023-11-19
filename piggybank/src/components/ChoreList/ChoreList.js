import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChoreList = () => {
    const [chores, setChores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-chores')
            .then(response => {
                setChores(response.data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching chores:', error));
    }, []);

    if (isLoading) {
        return <div>Loading chores...</div>;
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
