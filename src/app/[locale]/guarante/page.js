"use client";
import React, { Suspense } from "react";
import GuaranteView from "../../../components/pages/Guarante";
import Loading from "../loading";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const Payment = () => {
  return (
    <Suspense fallback={<Loading />}>
      <GuaranteView />
    </Suspense>
  );
};

export default Payment;
