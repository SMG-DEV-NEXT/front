"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the default styles
import Text from "../Text";

const PriceRangeSelector = ({
  min = 0,
  max = 1000,
  currency,
  range,
  setRange,
}) => {
  const [priceRange, setPriceRange] = useState([min, max]);
  const firstRender = useRef(true); // Track first render

  useEffect(() => {
    const handler = setTimeout(() => {
      setRange(priceRange);
    }, 500);

    return () => clearTimeout(handler);
  }, [priceRange]);

  const handleChange = (value) => {
    setPriceRange(value);
  };

  useEffect(() => {
    setPriceRange([min, max]);
  }, [min, max]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="py-2 px-[20.5px] bg-black rounded-lg">
          <Text T="none" className="text-linkColor" weight="medium" size="sm">
            {priceRange[0]}
            {currency}
          </Text>
        </div>
        <div className="py-2 px-[20.5px] bg-black rounded-lg">
          <Text T="none" className="text-linkColor" weight="medium" size="sm">
            {priceRange[1]}
            {currency}
          </Text>
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        range
        value={priceRange}
        trackStyle={{ backgroundColor: "#8B6DCA", height: 3 }}
        railStyle={{ backgroundColor: "#7B8293", height: 3 }}
        handleStyle={[
          {
            backgroundColor: "#fff",
            height: 16,
            width: 16,
            outline: "none",
            border: "none",
            marginTop: -8,
            boxShadow: "none",
          },
          {
            backgroundColor: "#fff",
            height: 16,
            width: 16,
            outline: "none",
            border: "none",
            marginTop: -8,
            boxShadow: "none",
          },
        ]}
        onChange={handleChange}
      />
    </div>
  );
};

export default PriceRangeSelector;
