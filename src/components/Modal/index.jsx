"use client";
import { useEffect } from "react";
import { useMobile } from "../../hooks/useMobile";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children, width, customTop }) {
  const isMobile = useMobile();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render if modal is closed
  if (isMobile) {
    return createPortal(
      <div
        className="fixed inset-0 flex items-start justify-center bg-[#0D0E11] bg-opacity-75 z-[500]"
        onClick={onClose}
      >
        <div
          style={{ marginTop: customTop ? customTop : "50%", width }}
          className="bg-input p-6 mt-[130px] rounded-2xl mx-5 relative"
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
  return createPortal(
    <div
      className="fixed inset-0 flex items-start justify-center bg-[#0D0E11] bg-opacity-75 z-[9999]"
      onClick={onClose}
    >
      <div
        style={{ marginTop: customTop ? customTop : "100%", width }}
        className="bg-input p-6 mt-[130px] rounded-2xl  relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
