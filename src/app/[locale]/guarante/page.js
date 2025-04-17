"use client";
import React, { Suspense } from "react";
import GuaranteView from "../../../pages/Guarante";
import Loading from "../loading";

const Payment = () => {
  return (
    <Suspense fallback={<Loading />}>
      <GuaranteView />
    </Suspense>
  );
};

export default Payment;
