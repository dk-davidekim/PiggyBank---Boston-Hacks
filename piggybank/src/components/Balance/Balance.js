import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Balance.css";

const Balance = () => {
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-total-balance')
            .then(response => {
                setBalance(response.data.total_balance);
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching balance:', error));
    }, []);

    if (isLoading) {
        return <div>Loading balance...</div>;
    }

    return (
        <div className="balance-box">
            <h2>Total Balance</h2>
            <p>${balance}</p>
        </div>
    );
};

export default Balance;
