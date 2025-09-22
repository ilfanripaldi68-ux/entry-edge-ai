import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Target, Activity } from "lucide-react";

const mockMarketData = [
  { symbol: "EUR/USD", price: "1.0875", change: "+0.0023", changePercent: "+0.21%", isUp: true },
  { symbol: "GBP/USD", price: "1.2634", change: "-0.0012", changePercent: "-0.09%", isUp: false },
  { symbol: "USD/JPY", price: "149.82", change: "+0.45", changePercent: "+0.30%", isUp: true },
  { symbol: "BTC/USD", price: "43,250", change: "+1,250", changePercent: "+2.98%", isUp: true },
];

const mockSignals = [
  { symbol: "EUR/USD", type: "BUY", rr: "1:3", winrate: "78%", time: "2 min ago" },
  { symbol: "Gold", type: "SELL", rr: "1:2", winrate: "85%", time: "5 min ago" },
  { symbol: "BTC/USD", type: "BUY", rr: "1:4", winrate: "72%", time: "8 min ago" },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="trading-title">Trading Dashboard</h2>
          <p className="text-sm text-muted-foreground">Monitor markets and signals in real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="profit-indicator">
            Live Signals Active
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="trading-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="price-display text-success">+$2,847</div>
            <p className="text-xs text-muted-foreground">+12.4% this month</p>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="price-display text-foreground">82.4%</div>
            <p className="text-xs text-muted-foreground">Last 30 signals</p>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Signals</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="price-display text-foreground">3</div>
            <p className="text-xs text-muted-foreground">2 Buy, 1 Sell</p>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg R:R</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="price-display text-foreground">1:2.8</div>
            <p className="text-xs text-muted-foreground">Risk Reward Ratio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Overview */}
        <Card className="trading-panel">
          <CardHeader>
            <CardTitle className="text-lg">Market Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockMarketData.map((market) => (
              <div key={market.symbol} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-primary">
                      {market.symbol.split('/')[0].substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="trading-metric font-semibold">{market.symbol}</div>
                    <div className="text-xs text-muted-foreground">Forex</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="trading-metric font-mono">{market.price}</div>
                  <div className={`text-xs flex items-center ${market.isUp ? 'text-success' : 'text-destructive'}`}>
                    {market.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {market.changePercent}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Signals */}
        <Card className="trading-panel">
          <CardHeader>
            <CardTitle className="text-lg">Recent Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSignals.map((signal, index) => (
              <div key={index} className="signal-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={signal.type === "BUY" ? "default" : "destructive"} className="text-xs">
                      {signal.type}
                    </Badge>
                    <span className="trading-metric font-semibold">{signal.symbol}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{signal.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="neutral-indicator">
                      R:R {signal.rr}
                    </div>
                    <div className="profit-indicator">
                      {signal.winrate} Win Rate
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};