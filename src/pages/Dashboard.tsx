import React from "react";
import { useTickers } from "@/hooks/useTickers";
import SignalPanel from "@/components/signals/SignalPanel";

export default function Dashboard() {
  const { tickers } = useTickers(["BTCUSDT","ETHUSDT","BNBUSDT"]);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {tickers.map(t => (
          <div key={t.symbol} className="bg-slate-800 p-4 rounded border border-slate-700">
            <div className="text-sm text-slate-400">{t.symbol}</div>
            <div className="text-xl font-semibold">${t.price.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Signals (real-time)</h2>
        <SignalPanel />
      </div>
    </div>
  );
}
