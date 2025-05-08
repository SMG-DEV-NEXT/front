"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Text from "../Text";

const PriceRangeSelector = ({
  min = 0,
  max = 1000,
  currency,
  range,
  setRange,
  usd,
}) => {
  const [priceRange, setPriceRange] = useState([min, max]);
  const hasInitialized = useRef(false); // ✅ Block first handleChange

  // Set initial range from props
  useEffect(() => {
    setPriceRange([min, max]);
  }, [min, max]);
  // Debounced effect to send range to parent
  useEffect(() => {
    if (!hasInitialized.current) return;

    const handler = setTimeout(() => {
      setRange(priceRange);
      hasInitialized.current = true; // ✅ Allow handleChange after first setup
    }, 500);

    return () => clearTimeout(handler);
  }, [priceRange]);

  const handleChange = (value) => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
    } // ✅ Ignore if not initialized yet
    setPriceRange(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="py-2 px-[20.5px] bg-black rounded-lg">
          <Text T="none" className="text-linkColor" weight="medium" size="sm">
            {usd ? (priceRange[0] / usd).toFixed(2) : priceRange[0]}
            {currency}
          </Text>
        </div>
        <div className="py-2 px-[20.5px] bg-black rounded-lg">
          <Text T="none" className="text-linkColor" weight="medium" size="sm">
            {usd ? (priceRange[1] / usd).toFixed(2) : priceRange[1]}
            {currency}
          </Text>
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        range
        value={priceRange}
        onChange={handleChange}
        trackStyle={{ backgroundColor: "#8B6DCA", height: 3 }}
        railStyle={{ backgroundColor: "#7B8293", height: 3 }}
        handleStyle={[
          {
            backgroundColor: "#fff",
            height: 16,
            width: 16,
            border: "none",
            marginTop: -8,
            boxShadow: "none",
          },
          {
            backgroundColor: "#fff",
            height: 16,
            width: 16,
            border: "none",
            marginTop: -8,
            boxShadow: "none",
          },
        ]}
      />
    </div>
  );
};

export default PriceRangeSelector;
