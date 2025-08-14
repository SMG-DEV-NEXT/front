"use client";
import { useEffect, useState } from "react";
import { useMobile } from "../../hooks/useMobile";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children, width, customTop }) {
  const isMobile = useMobile();
  const [show, setShow] = useState(false); // keeps modal in DOM
  const [animate, setAnimate] = useState(false); // controls animation state

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";

      // Ensure the hidden state is painted before animating
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setAnimate(true));
        return () => cancelAnimationFrame(raf2);
      });

      return () => cancelAnimationFrame(raf1);
    } else {
      document.body.style.overflow = "auto";
      setAnimate(false);

      // Wait for the closing animation before unmount
      const timer = setTimeout(() => setShow(false), 300); // match duration-300
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0D0E11] bg-opacity-75 z-[9999]"
      onClick={onClose}
    >
      <div
        style={{
          width: width || (isMobile ? "90%" : "auto"),
          top: customTop || undefined,
        }}
        className={`bg-input rounded-2xl p-6 transform transition-all duration-300 ease-out
          ${animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
