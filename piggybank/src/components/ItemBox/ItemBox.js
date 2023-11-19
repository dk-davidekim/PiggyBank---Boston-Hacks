import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemBox.css';

const ItemBox = () => {
    const [item, setItem] = useState('');
    const [price, setPrice] = useState(0);
    const [newItem, setNewItem] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItemAndPrice = async () => {
            try {
                const itemResponse = await axios.get('http://localhost:8080/api/get-item');
                const priceResponse = await axios.get('http://localhost:8080/api/get-price');

                setItem(itemResponse.data.item || '');
                setPrice(priceResponse.data.price || 0);
            } catch (error) {
                console.error('Error fetching item and price:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItemAndPrice();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/insert-item', { item: newItem, price: newPrice });
            setItem(newItem);
            setPrice(newPrice);
            setNewItem('');
            setNewPrice('');
        } catch (error) {
            console.error('Error inserting new item:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!item && price === 0) {
        return (
            <div className="item-box">
                <h2>Add a New Item</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={newItem} 
                        onChange={(e) => setNewItem(e.target.value)} 
                        placeholder="Item name" 
                        required 
                    />
                    <input 
                        type="number" 
                        value={newPrice} 
                        onChange={(e) => setNewPrice(e.target.value)} 
                        placeholder="Item price" 
                        required 
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

    return (
        <div className="item-box">
            <h2>Item Details</h2>
            <p><strong>Item:</strong> {item}</p>
            <p><strong>Price:</strong> ${price}</p>
        </div>
    );
};

export default ItemBox;
