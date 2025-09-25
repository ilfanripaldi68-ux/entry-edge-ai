import { useMemo } from "react";
import { useKlines } from "./useKlines";
import { sma, rsi } from "@/components/charts/indicators";
import { v4 as uuidv4 } from "uuid";

type Signal = {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  price: number;
  tp: number;
  sl: number;
  rr: number;
  time: string;
};

export function useSignalEngine(symbols: string[] = ["BTCUSDT"]) {
  // For simplicity we'll handle single symbol at a time; for multiple symbols run multiple hooks
  // But here we generate signals for first symbol only to keep code manageable
  const symbol = symbols[0];

  const { klines } = useKlines(symbol, 200);

  const signals = useMemo<Signal[]>(() => {
    if (!klines || klines.length < 50) return [];
    const closes = klines.map(k => k.close);
    // sma short & long
    const smaShort = sma(closes, 7);
    const smaLong = sma(closes, 25);
    const rsiVals = rsi(closes, 14);
    const latestClose = closes[closes.length - 1];
    const latestRsi = rsiVals[rsiVals.length - 1] ?? 50;
    // simple strategy: sma7 crosses above sma25 and RSI < 70 => BUY
    const signalsOut: Signal[] = [];
    // check crossover: compare previous values
    const idxShort = smaShort.length - 1;
    const idxLong = smaLong.length - 1;
    if (idxShort >= 1 && idxLong >= 1) {
      const sPrev = smaShort[idxShort - 1];
      const sNow = smaShort[idxShort];
      const lPrev = smaLong[idxLong - 1];
      const lNow = smaLong[idxLong];
      if (sPrev <= lPrev && sNow > lNow && latestRsi < 70) {
        // BUY
        const sl = latestClose * 0.995; // 0.5% SL
        const tp = latestClose * 1.01; // 1% TP
        const rr = (tp - latestClose) / (latestClose - sl || 1);
        signalsOut.push({
          id: uuidv4(),
          symbol,
          side: "BUY",
          price: latestClose,
          tp,
          sl,
          rr,
          time: new Date(klines[klines.length - 1].time * 1000).toLocaleString()
        });
      }
      // SELL: sma cross down + RSI > 30
      if (sPrev >= lPrev && sNow < lNow && latestRsi > 30) {
        const sl = latestClose * 1.005;
        const tp = latestClose * 0.99;
        const rr = (latestClose - tp) / (sl - latestClose || 1);
        signalsOut.push({
          id: uuidv4(),
          symbol,
          side: "SELL",
          price: latestClose,
          tp,
          sl,
          rr,
          time: new Date(klines[klines.length - 1].time * 1000).toLocaleString()
        });
      }
    }
    return signalsOut;
  }, [klines]);

  return { signals, klines };
}
