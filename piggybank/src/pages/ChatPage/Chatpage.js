import React, { useState } from 'react';
import './ChatPage.css';


function ChatPage() {
    const [item, setItem] = useState('');
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:8080/api/gpt-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item, description })
        })
        .then(res => res.json())
        .then(data => setResponse(data.response))
        .catch(err => console.error('Error:', err));
    };

    return (
        <div>
            <h1>Chat with GPT</h1>
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
            <p>Response: {response}</p>
        </div>
    );
}

export default ChatPage;

