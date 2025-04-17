"use client";
import Main from "@/pages/Main";
import "@/styles/global.scss";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // This runs only on the client
  }, []);

  if (!mounted) return null;
  return <Main />;
}
