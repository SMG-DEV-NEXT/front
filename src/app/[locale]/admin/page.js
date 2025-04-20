"use client";
import "@/styles/global.scss";
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/token";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  const locale = useLocale();
  const token = getAccessToken();
  redirect(token ? `/${locale}/admin/dashboard` : `/${locale}/admin/login`);
}
