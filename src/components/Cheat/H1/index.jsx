import { useLocale } from "next-intl";
import React from "react";

const CheatInvisibleH1 = ({ data }) => {
  const locale = useLocale();
  return (
    <h1 className="invisible absolute">
      {data?.[`h1${locale === "ru" ? "Ru" : "En"}`]}
    </h1>
  );
};

export default CheatInvisibleH1;
