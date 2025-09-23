import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CandlestickSeries,
} from "recharts";

export default function RealtimeChart({ symbol = "BTCUSDT" }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.k) {
        const k = message.k;
        const candle = {
          time: new Date(k.t).toLocaleTimeString(),
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        };

        setData((prev) => {
          const updated = [...prev];
          updated[updated.length - 1]?.time === candle.time
            ? (updated[updated.length - 1] = candle)
            : updated.push(candle);
          return updated.slice(-50); // simpan max 50 candle
        });
      }
    };

    return () => ws.close();
  }, [symbol]);

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-green-400 mb-2">
        📈 {symbol} Realtime Chart
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <CandlestickSeries
            dataKey="close"
            open="open"
            close="close"
            high="high"
            low="low"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
