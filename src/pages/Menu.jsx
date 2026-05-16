import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { getMenuItems } from '../api/apiService';

export default function Menu() {
    const { addToCart } = useContext(CartContext);
    const [menuItems, setMenuItems] = useState([]);
    const [addedItems, setAddedItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                setLoading(true);
                const items = await getMenuItems();
                setMenuItems(items);
                setError(null);
            } catch (err) {
                console.error('Error loading menu:', err);
                setError('Failed to load menu items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedItems({ ...addedItems, [item.name]: true });
        setTimeout(() => {
            setAddedItems({ ...addedItems, [item.name]: false });
        }, 1500);
    };

    return (
        <section className="menu-container">
            {loading && <p className="loading">Loading menu items...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && menuItems.length === 0 && <p>No menu items available.</p>}
            {!loading && !error && menuItems.map(item => (
                <div key={item._id} className="menu-card">
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p className="price">${item.price.toFixed(2)}</p>
                    <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(item)}
                        style={addedItems[item.name] ? { background: 'green' } : {}}
                    >
                        {addedItems[item.name] ? 'Added! ✓' : 'Add to Cart'}
                    </button>
                </div>
            ))}
        </section>
    );
}
