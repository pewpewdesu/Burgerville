import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Header({ onCartClick }) {
    const [navActive, setNavActive] = useState(false);
    const { getCartCount } = useContext(CartContext);

    const toggleNav = () => {
        setNavActive(!navActive);
    };

    return (
        <header>
            <Link to="/" className="logo">
                Burgerville
            </Link>
            <div className="hamburger" onClick={toggleNav}>
                &#9776;
            </div>
            <nav className={navActive ? 'active' : ''}>
                <ul>
                    <li><Link to="/" onClick={() => setNavActive(false)}>Home</Link></li>
                    <li><Link to="/menu" onClick={() => setNavActive(false)}>Menu</Link></li>
                    <li><Link to="/about" onClick={() => setNavActive(false)}>About</Link></li>
                    <li><Link to="/contact" onClick={() => setNavActive(false)}>Contact</Link></li>
                    <li><Link to="/gallery" onClick={() => setNavActive(false)}>Gallery</Link></li>
                    <li>
                        <a href="#" className="cart-icon" onClick={(e) => {
                            e.preventDefault();
                            onCartClick();
                            setNavActive(false);
                        }}>
                            🛒 Cart ({getCartCount()})
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
