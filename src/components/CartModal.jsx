import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartModal({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, checkout } = useContext(CartContext);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderResult, setOrderResult] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setError(null);
        setIsProcessing(true);

        try {
            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.address) {
                throw new Error('Please fill in all fields');
            }

            const order = await checkout(formData);
            setOrderResult(order);
            setShowCheckoutForm(false);
            setFormData({ name: '', email: '', phone: '', address: '' });
        } catch (err) {
            setError(err.message || 'Failed to process order');
            console.error('Checkout error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCloseOrderResult = () => {
        setOrderResult(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="cart-modal active" onClick={onClose}>
            <div className="cart-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>

                {orderResult ? (
                    <div className="order-confirmation">
                        <h2>✓ Order Confirmed!</h2>
                        <div className="order-details">
                            <p><strong>Order Number:</strong> {orderResult.orderNumber}</p>
                            <p><strong>Total:</strong> ${orderResult.total.toFixed(2)}</p>
                            <p><strong>Status:</strong> {orderResult.status}</p>
                            <p><strong>Estimated Time:</strong> 30-45 minutes</p>
                        </div>
                        <button className="btn-close-order" onClick={handleCloseOrderResult}>
                            Close
                        </button>
                    </div>
                ) : showCheckoutForm ? (
                    <div className="checkout-form">
                        <h2>Checkout</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleCheckout}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Delivery Address *</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-buttons">
                                <button 
                                    type="button" 
                                    className="btn-back" 
                                    onClick={() => setShowCheckoutForm(false)}
                                    disabled={isProcessing}
                                >
                                    Back
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn-submit" 
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <h2>Shopping Cart</h2>
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item._id} className="cart-item">
                                        <div className="cart-item-info">
                                            <h4>{item.name}</h4>
                                            <p>${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="cart-item-actions">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                                className="quantity-input"
                                            />
                                            <button
                                                className="btn-remove"
                                                onClick={() => removeFromCart(item._id)}
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
                                }}>
                                    Clear Cart
                                </button>
                                <button 
                                    className="btn-checkout" 
                                    onClick={() => setShowCheckoutForm(true)}
                                    disabled={cart.length === 0}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
