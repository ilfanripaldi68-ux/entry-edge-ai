import React from "react";

type Signal = {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  price: number;
  rr: number;
  tp: number;
  sl: number;
  time: string;
};

export default function SignalCard({ signal }: { signal: Signal }) {
  return (
    <div className="bg-slate-800 p-3 rounded border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{signal.symbol} · {signal.side}</div>
          <div className="text-sm text-slate-400">Price {signal.price.toFixed(2)}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">R:R {signal.rr.toFixed(2)}</div>
          <div className="text-xs text-slate-400">{signal.time}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-slate-300">TP {signal.tp.toFixed(2)} · SL {signal.sl.toFixed(2)}</div>
    </div>
  );
}
