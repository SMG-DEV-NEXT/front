"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { useLocale } from "next-intl";
import AdminTab from "@/components/admin/Tab";
import AdminHeader from "@/components/admin/Header";
export const dynamic = "force-dynamic";
export default function AdminLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const locale = useLocale();
  if (user && !user.isAdmin) {
    redirect(`/${locale}`);
  }
  return (
    <div className="admin-x  flex bg-mainBlack min-h-[100vh]">
      <AdminTab />
      <div className="flex pl-[280px] flex-col w-full">
        <AdminHeader />
        <div
          className="overflow-auto w-full search-scroll"
          style={{ minHeight: `calc(100% - 90px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
