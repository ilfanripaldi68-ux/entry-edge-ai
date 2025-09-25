import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import TradingPanel from "./pages/TradingPanel";
import Settings from "./pages/Settings";

export default function App() {
  const [route, setRoute] = useState<"dashboard" | "trading" | "settings">(
    "dashboard"
  );

  return (
    <div className="flex h-screen">
      <Sidebar active={route} onNavigate={(r) => setRoute(r)} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 overflow-auto">
          {route === "dashboard" && <Dashboard />}
          {route === "trading" && <TradingPanel />}
          {route === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}
