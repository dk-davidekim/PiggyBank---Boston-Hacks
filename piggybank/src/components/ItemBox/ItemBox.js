import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemBox = () => {
    const [item, setItem] = useState('');
    const [price, setPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch item and price from the backend
        const fetchItemAndPrice = async () => {
            try {
                const itemResponse = await axios.get('http://localhost:8080/api/get-item');
                const priceResponse = await axios.get('http://localhost:8080/api/get-price');

                setItem(itemResponse.data.item || 'No item found');
                setPrice(priceResponse.data.price || 0);
            } catch (error) {
                console.error('Error fetching item and price:', error);
                setItem('Error loading item');
                setPrice('Error loading price');
            } finally {
                setIsLoading(false);
            }
        };

        fetchItemAndPrice();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
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
