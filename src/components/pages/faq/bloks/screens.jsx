import ImageWithPreview from "@/components/PreviewImage";

export default function ScreensGrid({ screens, mobile }) {
  const getWidthClass = (count) => {
    if (mobile) return "w-full";
    switch (count) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      case 3:
        return "w-1/3";
      case 4:
        return "w-1/4";
      default:
        return "w-full";
    }
  };

  const widthClass = getWidthClass(screens.length);

  return (
    <div
      className="flex gap-2"
      style={{ flexWrap: mobile ? "wrap" : "nowrap" }}
    >
      {screens.map((src, i) => (
        <div key={i} className={`${widthClass} relative aspect-video`}>
          <ImageWithPreview
            src={src}
            alt={`screenshot-${i}`}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
