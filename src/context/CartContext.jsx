import React, { createContext, useState, useEffect } from 'react';
import { createOrder as submitOrder } from '../api/apiService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem._id === item._id);

        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item._id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            setCart(cart.map(item =>
                item._id === itemId ? { ...item, quantity } : item
            ));
        }
    };

    const clearCart = () => {
        if (cart.length > 0 && confirm('Are you sure you want to clear your cart?')) {
            setCart([]);
        }
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const checkout = async (customerInfo) => {
        try {
            if (cart.length === 0) {
                throw new Error('Cart is empty');
            }

            const orderItems = cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));

            const orderData = {
                items: orderItems,
                total: parseFloat(getCartTotal()),
                customerInfo
            };

            const order = await submitOrder(orderData);
            
            // Clear cart after successful order
            setCart([]);
            
            return order;
        } catch (error) {
            console.error('Checkout error:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            checkout
        }}>
            {children}
        </CartContext.Provider>
    );
};
