import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const menuItems = [
    {
        name: 'Classic Burger',
        price: 8.99,
        description: 'Juicy flame-grilled beef patty with lettuce, tomato, and our signature sauce.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400'
    },
    {
        name: 'Loaded Fries',
        price: 4.99,
        description: 'Crunchy fries topped with cheese, bacon, and our signature sauce.',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400'
    },
    {
        name: 'Cheese Pizza',
        price: 12.99,
        description: 'Classic pizza with a crispy crust, tangy tomato sauce, and melted mozzarella.',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400'
    },
    {
        name: 'Crispy Chicken Sandwich',
        price: 9.49,
        description: 'Golden fried chicken with lettuce, tomato, and house sauce.',
        image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400'
    },
    {
        name: 'Classic Cola',
        price: 2.49,
        description: 'Refreshing chilled cola served over ice.',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400'
    },
    {
        name: 'Strawberry Smoothie',
        price: 4.99,
        description: 'Creamy smoothie blended with fresh strawberries.',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400'
    }
];

export default function Menu() {
    const { addToCart } = useContext(CartContext);
    const [addedItems, setAddedItems] = useState({});

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedItems({ ...addedItems, [item.name]: true });
        setTimeout(() => {
            setAddedItems({ ...addedItems, [item.name]: false });
        }, 1500);
    };

    return (
        <section className="menu-container">
            {menuItems.map(item => (
                <div key={item.name} className="menu-card">
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
