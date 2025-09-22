import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Activity, RefreshCw } from "lucide-react";

const timeframes = [
  { value: "M1", label: "1 Minute" },
  { value: "M5", label: "5 Minutes" }, 
  { value: "M15", label: "15 Minutes" },
  { value: "H1", label: "1 Hour" },
  { value: "H4", label: "4 Hours" },
  { value: "D1", label: "Daily" }
];

const symbols = [
  "EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", 
  "Gold", "Silver", "Oil", "BTC/USD", "ETH/USD"
];

export const ChartPanel = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("EUR/USD");
  const [selectedTimeframe, setSelectedTimeframe] = useState("M15");
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="trading-title">Live Charts</h2>
          <p className="text-sm text-muted-foreground">Real-time price analysis with technical indicators</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={`${isLive ? 'text-success border-success' : 'text-muted-foreground'}`}>
            <Activity className="w-3 h-3 mr-1" />
            {isLive ? 'Live Feed' : 'Paused'}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {isLive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      {/* Chart Controls */}
      <Card className="trading-panel">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Chart Controls</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Symbol:</span>
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {symbols.map((symbol) => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Timeframe:</span>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((tf) => (
                      <SelectItem key={tf.value} value={tf.value}>
                        {tf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Chart Area */}
      <Card className="trading-panel">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>{selectedSymbol} - {selectedTimeframe}</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="price-display text-success">1.0875</div>
                <div className="text-xs text-success flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.0023 (0.21%)
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Chart - In real implementation, use TradingView widget or similar */}
          <div className="w-full h-96 bg-gradient-to-b from-secondary/20 to-secondary/40 rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
            {/* Mock Chart Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid Lines */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Mock Candlesticks */}
                {Array.from({ length: 20 }, (_, i) => {
                  const x = 20 + i * 18;
                  const high = 50 + Math.random() * 100;
                  const low = high - 20 - Math.random() * 20;
                  const open = low + Math.random() * (high - low);
                  const close = low + Math.random() * (high - low);
                  const isGreen = close > open;
                  
                  return (
                    <g key={i}>
                      {/* Wick */}
                      <line 
                        x1={x} y1={high} x2={x} y2={low} 
                        stroke="currentColor" 
                        strokeWidth="1"
                      />
                      {/* Body */}
                      <rect 
                        x={x-4} 
                        y={Math.min(open, close)} 
                        width="8" 
                        height={Math.abs(close - open) || 1}
                        fill={isGreen ? "hsl(var(--chart-bullish))" : "hsl(var(--chart-bearish))"}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {/* Center Message */}
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <div className="text-lg font-semibold text-foreground">Live Chart Integration</div>
                <div className="text-sm text-muted-foreground">
                  Connect to real-time data feed for live candlestick charts
                </div>
              </div>
            </div>
          </div>

          {/* Chart Footer Info */}
          <div className="mt-4 grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground">Open</div>
              <div className="trading-metric text-foreground">1.0852</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">High</div>
              <div className="trading-metric text-success">1.0878</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Low</div>
              <div className="trading-metric text-destructive">1.0848</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Close</div>
              <div className="trading-metric text-foreground">1.0875</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="trading-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">RSI (14)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">65.4</div>
            <div className="text-xs text-muted-foreground">Bullish</div>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">MACD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+0.0012</div>
            <div className="text-xs text-muted-foreground">Buy Signal</div>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">MA (20)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.0863</div>
            <div className="text-xs text-muted-foreground">Above MA</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};