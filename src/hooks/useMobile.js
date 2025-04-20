"use client";
import { useState, useEffect } from "react";

export function useMobile(value = 768) {
  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     setIsMobile(window.innerWidth < value);
  //   };
  //   checkScreenSize(); // Run on mount

  //   window.addEventListener("resize", checkScreenSize);
  //   return () => window.removeEventListener("resize", checkScreenSize);
  // }, []);

  return isMobile;
}
