"use client";
import Main from "@/components/pages/Main";
import "@/styles/global.scss";
import { Suspense, useEffect, useState } from "react";
import Loading from "../loading";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // This runs only on the client
  }, []);

  if (!mounted) return null;
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  );
}
