"use client";
import React from "react";
import "./index.scss";
import { useInView } from "react-intersection-observer";

const types = {
  "to-right": { class: "blockSlideLeft", active: "slideLeft" },
  "to-left": { class: "blockSlideRight", active: "slideRight" },
  "to-bottom": { class: "blockSlideBottom", active: "slideBottom" },
  "to-top": { class: "blockSlideTop", active: "slideTop" },
};

const Effect = ({
  children,
  type = "to-right",
  className,
  onceEffect = true,
  style = {},
}) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: onceEffect,
  });
  const thisEffect = types[type];
  return (
    <div
      style={style}
      ref={ref}
      className={`${className} ${thisEffect.class} ${
        inView ? thisEffect.active : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Effect;
