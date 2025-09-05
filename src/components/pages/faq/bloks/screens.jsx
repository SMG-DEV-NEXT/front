import MediaCarousel from "@/components/Cheat/Media/MediaCarousel";
import ImageWithPreview from "@/components/PreviewImage";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ScreensGrid({ screens, mobile }) {
  const [isOpenCarousel, setIsOpenCarousel] = useState({
    isOpen: false,
    index: 0,
  });
  const getWidthClass = (count) => {
    if (mobile) return "w-full";
    switch (count) {
      case 1:
        return "max-w-full";
      case 2:
        return "max-w-1/2";
      case 3:
        return "max-w-1/3";
      case 4:
        return "max-w-1/4";
      default:
        return "max-w-full";
    }
  };

  const widthClass = getWidthClass(screens.length);
  return (
    <div className="gap-2" style={{ flexWrap: mobile ? "wrap" : "nowrap" }}>
      {isOpenCarousel.isOpen &&
        createPortal(
          <MediaCarousel
            items={screens.map((e) => ({
              src: e.isHavePreview ? e.url : "",
              type: "image",
            }))}
            initialIndex={isOpenCarousel.index}
            onClose={() => setIsOpenCarousel({ isOpen: false, index: 0 })}
          />,
          document.body
        )}
      {screens.map((src, i) => (
        <div key={i} className={`${widthClass} relative`}>
          <ImageWithPreview
            src={src.url}
            isHavePreview={src.isHaveZoom}
            alt={`screenshot-${i}`}
            className="rounded-lg object-cover"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
