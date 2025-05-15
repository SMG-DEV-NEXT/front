import React, { Suspense } from "react";
import FAQView from "@/components/pages/faq/index";

const FAQ = () => {
  return (
    <Suspense fallback={null}>
      <FAQView />
    </Suspense>
  );
};

export default FAQ;
