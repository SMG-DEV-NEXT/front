"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

const CustomLink = ({ url, children, className }) => {
  const locale = useLocale(); // Get current locale

  return (
    <Link href={`/${locale}${url}`} className={className}>
      {children}
    </Link>
  );
};

export default CustomLink;
