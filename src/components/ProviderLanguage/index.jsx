"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function ProvidersLanguage({ children, messages }) {
  const locale = useLocale();
  const router = useRouter();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
