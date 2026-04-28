import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartModal({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext);

    if (!isOpen) return null;

    return (
        <div className="cart-modal active" onClick={onClose}>
            <div className="cart-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Shopping Cart</h2>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.name} className="cart-item">
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.name, parseInt(e.target.value))}
                                        className="quantity-input"
                                    />
                                    <button
                                        className="btn-remove"
                                        onClick={() => removeFromCart(item.name)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-summary">
                    <h3>Total: ${getCartTotal()}</h3>
                    <div className="cart-buttons">
                        <button className="btn-clear" onClick={() => {
                            clearCart();
                            onClose();
                        }}>
                            Clear Cart
                        </button>
                        <button className="btn-checkout" onClick={() => alert('Checkout functionality coming soon!')}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
