import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Slider = ({ height, width, arr }) => {
  const [currentIndex, setCurrentIndex] = useState(29); // Start with the rightmost element
  const sliderRef = useRef(null);
  arr = new Array(30).fill("");

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.scrollWidth;
    }
  }, []);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, arr.length - 1));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const elementWidth = sliderRef.current.children[0].offsetWidth + 26; // Width of each child including margin
      sliderRef.current.scrollLeft = currentIndex * elementWidth;
    }
  }, [currentIndex]);

  return (
    <section className="max-w-[98vw] relative flex items-center justify-between">
      <button onClick={handleLeftClick}>left</button>
      <article
        className="fade-gradient md:px-16 max-w-[98vw] flex overflow-hidden"
        ref={sliderRef}
      >
        {arr.map((a, i) => (
          <div
            className="min-w-20 rounded-lg bg-white/30 h-16 mx-3 my-2"
            key={i}
          >
            {i}
          </div>
        ))}
      </article>
      <button className="absolute right-1" onClick={handleRightClick}>
        right
      </button>
    </section>
  );
};

Slider.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  arr: PropTypes.array.isRequired,
};

export default Slider;
