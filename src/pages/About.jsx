import React from 'react';
import aboutImage from '../assets/istockphoto-1333944291-612x612.jpg';

export default function About() {
    return (
        <section className="about">
            <h2>Our Story</h2>
            <img
                src={aboutImage}
                alt="About Burgerville"
                className="about-img"
            />
            <p>
                Founded in 2020, Burgerville started as a small food truck with one goal —
                to serve bold, flavorful fast food made with fresh ingredients.
                Our signature flame-grilled burgers and hand-cut fries quickly became
                a local favorite. Today, we continue to serve our community with passion,
                quality, and unforgettable taste.
            </p>
        </section>
    );
}
