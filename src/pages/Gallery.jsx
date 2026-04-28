import React, { useState, useEffect } from 'react';

const galleryImages = [
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=480&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=480&fit=crop',
    'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&h=480&fit=crop',
    'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=480&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=480&fit=crop'
];

export default function Gallery() {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % galleryImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setSlideIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevSlide = () => {
        setSlideIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const goToSlide = (index) => {
        setSlideIndex(index);
    };

    return (
        <section className="gallery">
            <h1>Gallery</h1>
            <p>Check out our delicious food and restaurant</p>

            <div className="slider-wrapper">
                {galleryImages.map((image, index) => (
                    <div key={index} className={`slide ${index === slideIndex ? 'active' : ''}`}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}

                <button className="slider-btn prev" onClick={prevSlide}>&#10094;</button>
                <button className="slider-btn next" onClick={nextSlide}>&#10095;</button>
            </div>

            <div className="slider-dots">
                {galleryImages.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === slideIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
}
