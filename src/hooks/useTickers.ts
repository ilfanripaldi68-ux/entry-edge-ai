import { useEffect, useState } from "react";

export function useTickers(symbols: string[] = ["BTCUSDT","ETHUSDT","BNBUSDT"]) {
  const [tickers, setTickers] = useState<{symbol:string, price:number}[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
    ws.onmessage = (e) => {
      const arr = JSON.parse(e.data);
      const filtered = (arr as any[])
        .filter(d => symbols.includes(d.s))
        .map(d => ({ symbol: d.s, price: +d.c }));
      setTickers(filtered);
    };
    return () => ws.close();
  }, [symbols]);

  return { tickers };
}
