import React, { useState, useEffect } from "react";
import "./Banner.css";
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.jpg";
import banner4 from "../../assets/banner-4.jpg";
const Banner = () => {
  const images = [banner1, banner2, banner3, banner4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Set up the automatic sliding interval
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div
        className="carousel-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Slide ${index}`}
            className="carousel-image"
            key={index}
          />
        ))}
      </div>
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={
              index === currentIndex ? "indicator active" : "indicator"
            }
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
