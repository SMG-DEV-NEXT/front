"use client";
import { useTranslations } from "next-intl";
import Icon from "../Icons";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  T = "Index",
  leftIcon,
  style = {},
  iconSize,
  disabled,
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg relative text-center justify-center font-medium transition-all duration-300 flex items-center gap-3";

  const variants = {
    primary:
      "bg-primary text-white shadow-lg  before:absolute before:inset-0 before:rounded-lg  before:shadow-[inset_0_8px_19.5px_rgba(207,184,255,0.75)]",
    primary10: "bg-primary10 text-white ",
    secondary: "bg-[#8B6DCA26] text-primary80 ",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  };
  const t = useTranslations(T);
  const disabledStyles =
    "bg-[#8B6DCA26] text-primary10 opacity-[0.7] cursor-not-allowed shadow-none before:shadow-none";

  return (
    <button
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? disabledStyles : variants[variant]
      } hover:scale-105 hover:shadow-xl  hover:from-purple-600 
hover:to-indigo-500  transition-all duration-300 ease-out
`}
    >
      {disabled ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> // Circle Loader
      ) : (
        leftIcon && <Icon size={iconSize} name={leftIcon} />
      )}
      {t(children)}
    </button>
  );
}
