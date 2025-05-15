import { useRouter } from "next/navigation";
import React from "react";

const LoadingComponent = () => {
  console.log(1111);
  return (
    <div className="flex w-full h-[100vh]  items-center justify-center">
      <Icon name="logo" size={50} />
    </div>
  );
};

export default LoadingComponent;
