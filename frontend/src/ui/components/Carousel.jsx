import React, { useState } from 'react';

 export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    "public/nike.png",
    "public/adidas.png",
    "public/puma.png",
    "public/reebok.png",
    "public/underarmour.png",
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="w-full h-full mt-12">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 justify-end"> 
        <div id="default-carousel" className="relative w-full lg:col-span-5"> 
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hidden duration-700 ease-in-out ${activeIndex === index ? 'block' : ''}`}
                data-carousel-item
              >
                <img
                  src={slide}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-gray-900' : 'bg-gray-300'}`}
                aria-current={activeIndex === index ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handlePrev}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Előző</span>
            </span>
          </button>

          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handleNext}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="sr-only">Következő</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};


