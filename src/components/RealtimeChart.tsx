import React, { useEffect, useState, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

type Point = { time: string; value: number };

export default function RealtimeChart() {
  const [data, setData] = useState<Point[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // initial fill with empty points
    const init = Array.from({ length: 20 }).map((_, i) => ({
      time: `${i}`,
      value: 0,
    }));
    setData(init);

    async function tick() {
      try {
        // pakai Binance public API untuk TICKER (example: BTCUSDT)
        const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
        if (!res.ok) throw new Error("fetch failed");
        const json = await res.json();
        const price = Number(json.price) || 0;
        setData(prev => {
          const next = [...prev, { time: new Date().toLocaleTimeString(), value: Number(price.toFixed(2)) }];
          if (next.length > 30) next.shift();
          return next;
        });
      } catch (err) {
        console.warn(err);
      } finally {
        timerRef.current = window.setTimeout(tick, 3000);
      }
    }

    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" minTickGap={20} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#7c3aed" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
