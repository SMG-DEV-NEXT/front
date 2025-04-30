"use client";
import CodePreview from "@/components/pages/Preview";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Preview = () => {
  return <CodePreview />;
};

export default Preview;
