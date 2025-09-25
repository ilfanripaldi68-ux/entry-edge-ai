import React, { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData
} from "lightweight-charts";

type Props = {
  symbol?: string; // e.g. BTCUSDT
  width?: string | number;
  height?: number;
};

export default function CandlestickChart({ symbol = "BTCUSDT", height = 360 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    chartRef.current = createChart(containerRef.current, {
      layout: { backgroundColor: "#071022", textColor: "#fff" },
      rightPriceScale: { borderColor: "#2b3948" },
      timeScale: { borderColor: "#2b3948" },
      width: containerRef.current.clientWidth,
      height
    });
    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false
    });

    // resize observer
    const ro = new ResizeObserver(() => chartRef.current?.applyOptions({ width: containerRef.current?.clientWidth || 600 }));
    ro.observe(containerRef.current);

    // cleanup
    return () => {
      ro.disconnect();
      chartRef.current?.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`);
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        const k = msg.k;
        const c: CandlestickData = {
          time: Math.floor(k.t / 1000),
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c)
        };
        // update point
        seriesRef.current?.update(c);
      } catch (err) {
        console.warn(err);
      }
    };
    return () => ws.close();
  }, [symbol]);

  return (
    <div className="panel bg-slate-800 rounded p-2">
      <div ref={containerRef} style={{ width: "100%", height }} />
    </div>
  );
}
