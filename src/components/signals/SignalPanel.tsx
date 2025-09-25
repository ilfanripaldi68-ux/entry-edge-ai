import React from "react";
import SignalCard from "./SignalCard";
import { useSignalEngine } from "@/hooks/useSignalEngine";

export default function SignalPanel() {
  const { signals } = useSignalEngine(["BTCUSDT", "ETHUSDT"]);
  return (
    <div className="space-y-3">
      {signals.length === 0 && <div className="text-slate-400">No signals currently</div>}
      {signals.map(s => <SignalCard key={s.id} signal={s} />)}
    </div>
  );
}
