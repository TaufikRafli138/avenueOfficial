import React, { useState, useEffect } from "react";
// import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const images = [
    "/Nara.png",
    "/Odi.png",
    "/Vio.png",
    "/Nabi.png",
    "/Aurrel.png",
];


const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000); // Change the interval time as needed

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="slide-container" style={{ marginTop: '100px' }}>
            <div className="slideshow-images">
                {images.map((src, index) => (
                    <img
                        key={index}
                        className={`slideshow-image ${index === currentIndex ? "active" : ""}`}
                        src={src}
                        alt={`Slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
export default Slideshow;
