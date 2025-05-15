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
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
          className="bg-input absolute p-6  rounded-2xl "
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
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        className="bg-input absolute p-6  rounded-2xl "
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
