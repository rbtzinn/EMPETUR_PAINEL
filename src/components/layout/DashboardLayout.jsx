// src/layouts/DashboardLayout.jsx
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </div>
  );
}
