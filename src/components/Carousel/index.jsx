'use client'
import { useState, useEffect } from "react";
import Card from "../Main/Card";

const Carousel = ({ items }) => {
  const itemsPerPage = 2;
  const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true); // This runs only on the client
    }, []);
  
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalPages]);
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  if (!mounted) return null;
  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden">
      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: totalPages }).map((_, i) => (
          <div key={i} className="flex min-w-full gap-3">
            {items.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage).map((item, j) => (
             <Card key={j} {...item}/>
            ))}
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="relative justify-center mt-6 bottom-[0] left-1/2 transform  -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`h-[8px] rounded-full transition-all duration-300 ${currentIndex === i ? "bg-primary80 w-[24px]" : "bg-black w-[8px] "}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
