"use client";
import React, { Suspense } from "react";
import View from "../../../components/pages/Catalog";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
function Catalog() {
  return (
    <Suspense fallback={null}>
      <View />
    </Suspense>
  );
}

export default Catalog;
