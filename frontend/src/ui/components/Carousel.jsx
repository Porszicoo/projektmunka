import { useState } from "react";

export const Carousel = () => {
  const images = [
    { src: "/adidas.png", alt: "adidas" },
    { src: "/under_armour.png", alt: "underarmour" },
    { src: "/nike.png", alt: "nike" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      id="horizontal-thumbnails"
      className="relative w-full h-[400px] flex flex-col items-center"
    >
      {/* Nagy kép container */}
      <div className="carousel h-[300px] w-full flex items-center justify-center mb-2 overflow-hidden">
        {/* Slide-ok */}
        <div className="carousel-body h-full w-full flex items-center justify-center">
          <div className="carousel-slide flex items-center justify-center">
            <img
              src={images[currentIndex].src}
              className="h-3/4 w-auto max-w-[40%] object-contain rounded-lg transition-transform duration-300 ease-in-out"
              alt={images[currentIndex].alt}
            />
          </div>
        </div>

        {/* Navigációs gombok */}
        <button
          type="button"
          className="carousel-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full shadow p-2"
          onClick={handlePrev}
        >
          <span className="sr-only">Előző</span>
          <span className="text-lg">&lt;</span>
        </button>
        <button
          type="button"
          className="carousel-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full shadow p-2"
          onClick={handleNext}
        >
          <span className="sr-only">Következő</span>
          <span className="text-lg">&gt;</span>
        </button>
      </div>

      {/* Kis képek (pagination) */}
      <div className="carousel-pagination flex gap-4 mb-2 mt-[-50px]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            className={`carousel-pagination-item w-18 h-14 object-cover rounded-lg cursor-pointer ${
              currentIndex === index ? "opacity-100 border-2 border-blue-500" : "opacity-50"
            } hover:opacity-100`}
            alt={image.alt}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};