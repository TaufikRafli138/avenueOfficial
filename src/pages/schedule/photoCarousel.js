import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css'; // Your custom CSS file for styling

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000, // Change the speed of autoplay here
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                <div>
                    <img src="/Aurrel.png" alt="Slide 1" />
                </div>
                <div>
                    <img src="/Aurrel.png" alt="Slide 2" />
                </div>
                <div>
                    <img src="/Aurrel.png" alt="Slide 3" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
