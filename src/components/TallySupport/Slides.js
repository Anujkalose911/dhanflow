import React, { useState } from "react";
import "../../Assests/CSS/Slides.css";

const Slides = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`slides-outer-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="carousel-container">
        <div className="slides-container">
          <div className="slide">
            <div className="image-container">
              <img 
                src={images[currentIndex]} 
                alt={`Slide ${currentIndex + 1}`} 
              />
              <button className="carousel-button prev" onClick={goToPrevious}>
                ‹
              </button>
              <button className="carousel-button next" onClick={goToNext}>
                ›
              </button>
              <div className="fullscreen-icon" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                )}
              </div>
            </div>
            <p className="slide-counter">Slide {currentIndex + 1}/{images.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slides;