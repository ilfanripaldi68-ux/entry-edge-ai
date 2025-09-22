import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, TrendingDown, Clock, Target, Star } from "lucide-react";

const mockLiveSignals = [
  {
    id: 1,
    symbol: "EUR/USD",
    type: "BUY",
    entry: "1.0875",
    tp: ["1.0925", "1.0965", "1.1005"],
    sl: "1.0825",
    rr: "1:3",
    winrate: 78,
    strength: 85,
    timeframe: "H1",
    timestamp: "2 min ago",
    status: "Active"
  },
  {
    id: 2,
    symbol: "Gold",
    type: "SELL",
    entry: "2045.50",
    tp: ["2025.00", "2010.00", "1995.00"],
    sl: "2065.00", 
    rr: "1:2.5",
    winrate: 85,
    strength: 92,
    timeframe: "H4",
    timestamp: "5 min ago",
    status: "Active"
  },
  {
    id: 3,
    symbol: "BTC/USD",
    type: "BUY",
    entry: "43250",
    tp: ["44500", "45750", "47000"],
    sl: "41750",
    rr: "1:4",
    winrate: 72,
    strength: 78,
    timeframe: "H1",
    timestamp: "8 min ago",
    status: "Pending"
  }
];

const mockPastSignals = [
  {
    id: 4,
    symbol: "GBP/USD",
    type: "SELL",
    entry: "1.2650",
    exit: "1.2580",
    result: "Win",
    profit: "+70 pips",
    rr: "1:2",
    winrate: 80,
    timestamp: "2 hours ago",
    status: "Closed"
  },
  {
    id: 5,
    symbol: "USD/JPY", 
    type: "BUY",
    entry: "149.50",
    exit: "149.20",
    result: "Loss",
    profit: "-30 pips",
    rr: "1:3",
    winrate: 75,
    timestamp: "4 hours ago", 
    status: "Closed"
  }
];

export const SignalsPanel = () => {
  const [activeTab, setActiveTab] = useState("live");

  const getStrengthColor = (strength: number) => {
    if (strength >= 90) return "text-success";
    if (strength >= 80) return "text-accent"; 
    if (strength >= 70) return "text-primary";
    return "text-muted-foreground";
  };

  const getStrengthLabel = (strength: number) => {
    if (strength >= 90) return "Very Strong";
    if (strength >= 80) return "Strong";
    if (strength >= 70) return "Moderate";
    return "Weak";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="trading-title">Trading Signals</h2>
          <p className="text-sm text-muted-foreground">AI-powered entry signals with technical & fundamental analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-success border-success">
            <Zap className="w-3 h-3 mr-1" />
            AI Engine Active
          </Badge>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">Win Rate: 78.4%</div>
            <div className="text-xs text-muted-foreground">Last 50 signals</div>
          </div>
        </div>
      </div>

      {/* Signal Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="trading-panel">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-xs text-muted-foreground">Active Signals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">78.4%</div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <div>
                <div className="text-2xl font-bold text-foreground">1:2.8</div>
                <div className="text-xs text-muted-foreground">Avg R:R</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-accent" />
              <div>
                <div className="text-2xl font-bold text-foreground">87.2</div>
                <div className="text-xs text-muted-foreground">Avg Strength</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signals Tabs */}
      <Card className="trading-panel">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="live">Live Signals ({mockLiveSignals.length})</TabsTrigger>
              <TabsTrigger value="history">Signal History</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="live" className="space-y-4">
              {mockLiveSignals.map((signal) => (
                <div key={signal.id} className="signal-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={signal.type === "BUY" ? "default" : "destructive"}
                        className="flex items-center space-x-1"
                      >
                        {signal.type === "BUY" ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        <span>{signal.type}</span>
                      </Badge>
                      <div>
                        <div className="trading-metric font-semibold text-lg">{signal.symbol}</div>
                        <div className="text-xs text-muted-foreground flex items-center space-x-2">
                          <span>{signal.timeframe}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{signal.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge 
                        variant="outline" 
                        className={`${getStrengthColor(signal.strength)} border-current`}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {getStrengthLabel(signal.strength)}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Strength: {signal.strength}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Entry & Risk</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center p-2 rounded bg-primary/10">
                          <span className="text-xs text-muted-foreground">Entry</span>
                          <span className="trading-metric font-mono text-primary">{signal.entry}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-destructive/10">
                          <span className="text-xs text-muted-foreground">Stop Loss</span>
                          <span className="trading-metric font-mono text-destructive">{signal.sl}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Take Profit Levels</h4>
                      <div className="space-y-1">
                        {signal.tp.map((tp, index) => (
                          <div key={index} className="flex justify-between items-center p-1.5 rounded bg-success/10">
                            <span className="text-xs text-muted-foreground">TP{index + 1}</span>
                            <span className="text-sm font-mono text-success">{tp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <div className="neutral-indicator">
                        R:R {signal.rr}
                      </div>
                      <div className="profit-indicator">
                        {signal.winrate}% Win Rate
                      </div>
                      <Badge 
                        variant={signal.status === "Active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {signal.status}
                      </Badge>
                    </div>
                    <Button size="sm" className="trading-gradient-bg">
                      Trade Signal
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {mockPastSignals.map((signal) => (
                <div key={signal.id} className="signal-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={signal.type === "BUY" ? "default" : "destructive"}
                        className="flex items-center space-x-1"
                      >
                        {signal.type === "BUY" ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        <span>{signal.type}</span>
                      </Badge>
                      <div>
                        <div className="trading-metric font-semibold">{signal.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          Entry: {signal.entry} → Exit: {signal.exit}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={signal.result === "Win" ? "default" : "destructive"}
                        className={signal.result === "Win" ? "bg-success text-success-foreground" : ""}
                      >
                        {signal.result}
                      </Badge>
                      <div className={`text-sm font-mono ${signal.result === "Win" ? "text-success" : "text-destructive"}`}>
                        {signal.profit}
                      </div>
                      <div className="text-xs text-muted-foreground">{signal.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};