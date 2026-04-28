import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section className="hero">
            <div>
                <h1>A Classic Take on Burgers</h1>
                <Link to="/menu" className="btn">View Menu</Link>
            </div>
        </section>
    );
}
