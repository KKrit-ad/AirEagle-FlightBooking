import React, { useState, useEffect } from "react";
import "./MainInfo.css";
import info2 from "../../assets/info-2.jpg";
import banner1 from "../../assets/banner-1.jpg";
import info3 from "../../assets/info-3.jpg";

const MainInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { img: banner1, text: "Welcome to our airport!" },
    { img: info2, text: "Shop and Dine options" },
    { img: info3, text: "Transportation services" },
    // เพิ่มรูปและข้อความอื่น ๆ ตามต้องการ
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // เรียกฟังก์ชัน handleNext ทุก 5 วินาที
    }, 5000);

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  return (
    <div className="main-info-container">
      <div className="main-info-airport-guide">
        <h2>Airport Guide</h2>
        <div className="main-info-guide-options">
          <button className="main-info-guide-option-button">
            <i className="fas fa-user"></i> Passenger Guide
          </button>
          <button className="main-info-guide-option-button">
            <i className="fas fa-utensils"></i> Shop and Dine
          </button>
          <button className="main-info-guide-option-button">
            <i className="fas fa-bus"></i> Transportation
          </button>
        </div>
      </div>
      <div className="main-info-carousel">
        <button
          className="main-info-carousel-control-button"
          onClick={handlePrev}
        >
          ❮
        </button>
        <div
          className="main-info-carousel-track"
          style={{
            transform: `translateX(${-currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div className="main-info-carousel-slide" key={index}>
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="main-info-carousel-image"
              />
              <div className="main-info-carousel-caption">{slide.text}</div>
            </div>
          ))}
        </div>
        <button
          className="main-info-carousel-control-button"
          onClick={handleNext}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default MainInfo;
