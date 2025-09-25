import React from "react";

export default function Navbar() {
  return (
    <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center px-4">
      <div className="flex-1 text-sm text-slate-300">Entry Edge AI — Live Trading Dashboard</div>
      <div className="text-slate-300">No API Key required — public Binance</div>
    </header>
  );
}
