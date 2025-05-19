"use client";
import React, { Suspense } from "react";
import GuaranteView from "../../../components/pages/Guarante";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Payment = () => {
  return (
    <Suspense fallback={null}>
      <GuaranteView />
    </Suspense>
  );
};

export default Payment;
