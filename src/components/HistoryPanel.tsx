import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, TrendingUp, TrendingDown, Download, Filter, Calendar } from "lucide-react";

const mockTradeHistory = [
  {
    id: 1,
    symbol: "EUR/USD",
    type: "BUY",
    entry: "1.0845",
    exit: "1.0895",
    lots: 0.1,
    profit: 50,
    pips: 50,
    rr: "1:2",
    duration: "2h 15m",
    date: "2024-01-15 14:30",
    result: "Win"
  },
  {
    id: 2,
    symbol: "Gold",
    type: "SELL", 
    entry: "2055.00",
    exit: "2035.50",
    lots: 0.05,
    profit: 97.5,
    pips: 195,
    rr: "1:3",
    duration: "4h 45m",
    date: "2024-01-15 10:15",
    result: "Win"
  },
  {
    id: 3,
    symbol: "GBP/USD",
    type: "BUY",
    entry: "1.2650",
    exit: "1.2630",
    lots: 0.1,
    profit: -20,
    pips: -20,
    rr: "1:2",
    duration: "1h 30m", 
    date: "2024-01-14 16:20",
    result: "Loss"
  },
  {
    id: 4,
    symbol: "BTC/USD",
    type: "BUY",
    entry: "42500",
    exit: "44250",
    lots: 0.01,
    profit: 175,
    pips: 1750,
    rr: "1:4",
    duration: "8h 20m",
    date: "2024-01-14 08:00",
    result: "Win"
  },
  {
    id: 5,
    symbol: "USD/JPY",
    type: "SELL",
    entry: "149.80", 
    exit: "149.95",
    lots: 0.1,
    profit: -15,
    pips: -15,
    rr: "1:2",
    duration: "45m",
    date: "2024-01-13 13:45",
    result: "Loss"
  }
];

const mockSignalHistory = [
  {
    id: 1,
    symbol: "EUR/USD",
    type: "BUY",
    signalTime: "2024-01-15 14:25",
    executionTime: "2024-01-15 14:30", 
    winrate: 78,
    strength: 85,
    result: "Win",
    actualRR: "1:2.1"
  },
  {
    id: 2,
    symbol: "Gold",
    type: "SELL",
    signalTime: "2024-01-15 10:10",
    executionTime: "2024-01-15 10:15",
    winrate: 85,
    strength: 92,
    result: "Win", 
    actualRR: "1:3.2"
  }
];

export const HistoryPanel = () => {
  const [activeTab, setActiveTab] = useState("trades");
  const [filterSymbol, setFilterSymbol] = useState("all");
  const [filterResult, setFilterResult] = useState("all");

  const totalTrades = mockTradeHistory.length;
  const winningTrades = mockTradeHistory.filter(t => t.result === "Win").length;
  const winRate = ((winningTrades / totalTrades) * 100).toFixed(1);
  const totalProfit = mockTradeHistory.reduce((sum, trade) => sum + trade.profit, 0);

  const symbols = ["all", ...Array.from(new Set(mockTradeHistory.map(t => t.symbol)))];

  const filteredTrades = mockTradeHistory.filter(trade => {
    if (filterSymbol !== "all" && trade.symbol !== filterSymbol) return false;
    if (filterResult !== "all" && trade.result !== filterResult) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="trading-title">Trading History</h2>
          <p className="text-sm text-muted-foreground">Complete record of trades and signal performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="trading-panel">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{totalTrades}</div>
                <div className="text-xs text-muted-foreground">Total Trades</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">{winRate}%</div>
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
                <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {totalProfit >= 0 ? '+' : ''}${totalProfit}
                </div>
                <div className="text-xs text-muted-foreground">Total P&L</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-panel">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{winningTrades}</div>
                <div className="text-xs text-muted-foreground">Winning Trades</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Tabs */}
      <Card className="trading-panel">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="trades">Trade History</TabsTrigger>
                <TabsTrigger value="signals">Signal History</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterSymbol} onValueChange={setFilterSymbol}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Symbol" />
                </SelectTrigger>
                <SelectContent>
                  {symbols.map((symbol) => (
                    <SelectItem key={symbol} value={symbol}>
                      {symbol === "all" ? "All Symbols" : symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterResult} onValueChange={setFilterResult}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Win">Win</SelectItem>
                  <SelectItem value="Loss">Loss</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="trades" className="space-y-4">
              {filteredTrades.map((trade) => (
                <div key={trade.id} className="signal-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={trade.type === "BUY" ? "default" : "destructive"}
                        className="flex items-center space-x-1"
                      >
                        {trade.type === "BUY" ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        <span>{trade.type}</span>
                      </Badge>
                      <div>
                        <div className="trading-metric font-semibold text-lg">{trade.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          {trade.date} • Duration: {trade.duration}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={trade.result === "Win" ? "default" : "destructive"}
                        className={trade.result === "Win" ? "bg-success text-success-foreground" : ""}
                      >
                        {trade.result}
                      </Badge>
                      <div className={`text-lg font-bold ${trade.profit >= 0 ? "text-success" : "text-destructive"}`}>
                        {trade.profit >= 0 ? '+' : ''}${trade.profit}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">Entry → Exit</div>
                      <div className="trading-metric font-mono">
                        {trade.entry} → {trade.exit}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Lots</div>
                      <div className="trading-metric">{trade.lots}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Pips</div>
                      <div className={`trading-metric ${trade.pips >= 0 ? "text-success" : "text-destructive"}`}>
                        {trade.pips >= 0 ? '+' : ''}{trade.pips}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">R:R Achieved</div>
                      <div className="trading-metric">{trade.rr}</div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="signals" className="space-y-4">
              {mockSignalHistory.map((signal) => (
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
                          Signal: {signal.signalTime} • Executed: {signal.executionTime}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge 
                        variant={signal.result === "Win" ? "default" : "destructive"}
                        className={signal.result === "Win" ? "bg-success text-success-foreground" : ""}
                      >
                        {signal.result}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Predicted: {signal.winrate}% • Strength: {signal.strength}%
                      </div>
                      <div className="trading-metric">
                        Actual R:R: {signal.actualRR}
                      </div>
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