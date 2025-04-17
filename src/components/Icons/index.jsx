"use client";
import Image from "next/image";

export default function Icon({
  name,
  alt = "",
  h,
  size = 24,
  className = "",
  style,
  folder,
}) {
  if (!name) return null; // Prevent errors if no name is provided
  return (
    <Image
      src={folder ? `/icons/${folder}/${name}.svg` : `/icons/${name}.svg`} // Assumes SVG format
      alt={alt || name}
      width={size}
      style={style}
      height={h || size}
      className={`w-[${size}px] h-[${size}px] ${className}`} // Tailwind classes
    />
  );
}
