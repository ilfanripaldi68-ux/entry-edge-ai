import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import ChartPage from "./pages/ChartPage";
import Signals from "./pages/Signals";
import History from "./pages/History";

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 24 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chart" element={<ChartPage />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<div>Oops — halaman gak ketemu</div>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
