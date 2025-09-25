export async function fetchKlines(symbol = "BTCUSDT", limit = 100) {
  const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=${limit}`);
  if (!res.ok) throw new Error("fetch klines failed");
  const json = await res.json();
  return json.map((k:any) => ({
    time: Math.floor(k[0] / 1000),
    open: +k[1],
    high: +k[2],
    low: +k[3],
    close: +k[4],
    volume: +k[5]
  }));
}
