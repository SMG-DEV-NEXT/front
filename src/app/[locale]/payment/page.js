"use client";
import React from "react";
import PaymentView from "../../../components/pages/Payment";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Payment = () => {
  return <PaymentView />;
};

export default Payment;
