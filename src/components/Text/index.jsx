import { useTranslations } from "next-intl";

export default function Text({
  children,
  size = "base",
  weight = "normal",
  className = "",
  T = "Index",
  onClick,
  style,
}) {
  const sizes = {
    t11: "text-[11px] leading-[18px]",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    t48: "text-[48px] leading-120",
    t38: "text-[38px] leading-120",
    t40: "text-[40px] leading-120",
  };

  const weights = {
    thin: "font-thin",
    normal: "font-normal",
    medium: "font-medium",
    semi: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };
  const t = T === "none" ? (e) => e : useTranslations(T);
  if (!children) {
    return (
      <p
        onClick={onClick}
        style={style}
        className={`${sizes[size]} ${weights[weight]} ${className}`}
      >
        {children}
      </p>
    );
  }
  return (
    <p
      onClick={onClick}
      style={style}
      className={`${sizes[size]} ${weights[weight]} ${className}`}
    >
      {t(children)}
    </p>
  );
}
