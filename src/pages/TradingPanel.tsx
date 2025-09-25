import React, { useState } from "react";
import CandlestickChart from "@/components/charts/CandlestickChart";

export default function TradingPanel() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [position, setPosition] = useState<any[]>([]);

  function openSim(side: "BUY"|"SELL") {
    const price = Math.random() * (45000 - 40000) + 40000; // simulate
    setPosition(prev => [...prev, { id: Date.now(), side, price }]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <select value={symbol} onChange={(e) => setSymbol(e.target.value)} className="bg-slate-800 p-2 rounded">
          <option>BTCUSDT</option>
          <option>ETHUSDT</option>
          <option>BNBUSDT</option>
        </select>
        <button onClick={()=>openSim("BUY")} className="px-3 py-1 rounded bg-green-600">Sim BUY</button>
        <button onClick={()=>openSim("SELL")} className="px-3 py-1 rounded bg-red-600">Sim SELL</button>
      </div>

      <CandlestickChart symbol={symbol} height={420} />

      <div>
        <h3 className="font-semibold">Positions (simulation)</h3>
        <ul>
          {position.map(p => (
            <li key={p.id} className="bg-slate-800 p-2 my-2 rounded border border-slate-700">{p.side} @ {p.price.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
