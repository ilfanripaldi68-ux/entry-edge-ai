import { useEffect, useRef, useState } from "react";

export type Kline = {
  time: number; // unix sec
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export function useKlines(symbol = "BTCUSDT", limit = 100) {
  const [klines, setKlines] = useState<Kline[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadInitial() {
      try {
        const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=${limit}`);
        const json = await res.json();
        const mapped = json.map((k:any) => ({
          time: Math.floor(k[0] / 1000),
          open: +k[1],
          high: +k[2],
          low: +k[3],
          close: +k[4],
          volume: +k[5]
        }));
        if (mounted) setKlines(mapped);
      } catch (err) {
        console.warn("klines fetch failed", err);
      }
    }
    loadInitial();

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`);
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      const k = msg.k;
      const candle = {
        time: Math.floor(k.t / 1000),
        open: +k.o,
        high: +k.h,
        low: +k.l,
        close: +k.c,
        volume: +k.v
      };
      setKlines(prev => {
        const next = prev.slice();
        if (next.length === 0 || next[next.length-1].time !== candle.time) {
          next.push(candle);
        } else {
          next[next.length-1] = candle;
        }
        if (next.length > limit) next.shift();
        return next;
      });
    };
    wsRef.current = ws;

    return () => { mounted = false; ws.close(); wsRef.current = null; };
  }, [symbol, limit]);

  return { klines };
}
