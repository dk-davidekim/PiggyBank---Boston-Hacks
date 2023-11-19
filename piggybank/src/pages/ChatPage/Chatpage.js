import React, { useState } from 'react';

function ChatPage() {
    const [item, setItem] = useState('');
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading status

    const handleSubmit = () => {
        setIsLoading(true); // Set loading to true
        fetch('http://localhost:8080/api/gpt-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item, description })
        })
        .then(res => res.json())
        .then(data => {
            setResponse(data.response);
            setIsLoading(false); // Set loading to false once data is received
        })
        .catch(err => {
            console.error('Error:', err);
            setIsLoading(false); // Set loading to false if there is an error
        });
    };

    return (
        <div>
            <h1>Chat with PiggyBank Teller</h1>
            <input 
                type="text" 
                value={item} 
                onChange={e => setItem(e.target.value)} 
                placeholder="Item"
            />
            <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Describe the item"
            />
            <button onClick={handleSubmit}>Submit</button>
            
            {isLoading ? (
                <p>Loading...</p> // Display loading message
            ) : (
                <div className="response-box">Response: {response}</div> // Display response
            )}
        </div>
    );
}

export default ChatPage;
