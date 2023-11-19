import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AllowanceManager.css";

const AllowanceManager = () => {
    const [allowance, setAllowance] = useState(0);
    const [newAllowance, setNewAllowance] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-allowance')
            .then(response => setAllowance(response.data.allowance))
            .catch(error => console.error('Error fetching allowance:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/insert-allowance', { amount: newAllowance })
            .then(() => {
                setAllowance(newAllowance);
                setNewAllowance('');
            })
            .catch(error => console.error('Error updating allowance:', error));
    };

    return (
        <div className="allowance-manager">
            <h2>Current Allowance: ${allowance}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    value={newAllowance} 
                    onChange={(e) => setNewAllowance(e.target.value)} 
                    placeholder="Set new allowance" 
                />
                <button type="submit">Update Allowance</button>
            </form>
        </div>
    );
};

export default AllowanceManager;
