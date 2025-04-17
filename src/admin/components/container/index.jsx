"use client";
import React from "react";

const AdminContainer = ({ children }) => {
  return (
    <div className="max-w-[1080px] min-w-[1080px] mx-auto px-10">
      {children}
    </div>
  );
};

export default AdminContainer;
