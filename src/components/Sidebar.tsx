// src/components/Sidebar.tsx
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>Dashboard</li>
        <li>Trading</li>
        <li>Chart</li>
        <li>Signals</li>
        <li>History</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
