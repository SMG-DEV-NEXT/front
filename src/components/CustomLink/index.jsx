"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomLink = ({ url, children, className, isMobile }) => {
  const locale = useLocale(); // Get current locale
  const router = useRouter();
  if (isMobile)
    return (
      <div
        onClick={() => router.push(url)}
        className={`${className} cursor-pointer`}
      >
        {children}
      </div>
    );
  if (locale === "en") {
    return (
      <Link href={`/${url}`} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link href={`/${locale}${url}`} className={className}>
      {children}
    </Link>
  );
};

export default CustomLink;
