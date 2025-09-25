export function sma(values: number[], period: number) {
  if (values.length < period) return [];
  const result: number[] = [];
  for (let i = 0; i <= values.length - period; i++) {
    const slice = values.slice(i, i + period);
    result.push(slice.reduce((a,b)=>a+b,0)/period);
  }
  return result;
}

export function rsi(values: number[], period = 14) {
  if (values.length <= period) return [];
  const gains = [];
  const losses = [];
  for (let i = 1; i < values.length; i++) {
    const diff = values[i] - values[i-1];
    gains.push(Math.max(0, diff));
    losses.push(Math.max(0, -diff));
  }
  let avgGain = gains.slice(0, period).reduce((a,b)=>a+b,0)/period;
  let avgLoss = losses.slice(0, period).reduce((a,b)=>a+b,0)/period;
  const rsis = [];
  rsis[period] = 100 - (100 / (1 + avgGain/avgLoss || 1));
  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    const rs = avgGain / (avgLoss || 1);
    rsis.push(100 - (100 / (1 + rs)));
  }
  // return aligned length to values (pad initial)
  const pad = new Array(period).fill(null);
  return pad.concat(rsis);
}
