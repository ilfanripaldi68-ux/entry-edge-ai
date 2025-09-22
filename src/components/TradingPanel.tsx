import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Target, Zap } from "lucide-react";

const mockActiveSignals = [
  {
    id: 1,
    symbol: "EUR/USD",
    type: "BUY",
    entry: "1.0875",
    tp1: "1.0925",
    tp2: "1.0965", 
    tp3: "1.1005",
    sl: "1.0825",
    rr: "1:3",
    winrate: "78%",
    strength: "Strong"
  },
  {
    id: 2,
    symbol: "Gold",
    type: "SELL", 
    entry: "2045.50",
    tp1: "2025.00",
    tp2: "2010.00",
    tp3: "1995.00", 
    sl: "2065.00",
    rr: "1:2.5",
    winrate: "85%",
    strength: "Very Strong"
  }
];

export const TradingPanel = () => {
  const [selectedSignal, setSelectedSignal] = useState(mockActiveSignals[0]);
  const [orderSize, setOrderSize] = useState("0.01");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="trading-title">Trading Panel</h2>
          <p className="text-sm text-muted-foreground">Execute trades based on AI signals</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-success border-success">
            <Zap className="w-3 h-3 mr-1" />
            Auto TP/SL Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signal Selection */}
        <Card className="trading-panel lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Active Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockActiveSignals.map((signal) => (
              <div 
                key={signal.id}
                className={`signal-card cursor-pointer transition-all ${
                  selectedSignal.id === signal.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedSignal(signal)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={signal.type === "BUY" ? "default" : "destructive"} className="text-xs">
                      {signal.type === "BUY" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {signal.type}
                    </Badge>
                    <span className="trading-metric font-semibold">{signal.symbol}</span>
                  </div>
                  <Badge 
                    variant="outline"
                    className={signal.strength === "Very Strong" ? "text-success border-success" : "text-accent border-accent"}
                  >
                    {signal.strength}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="neutral-indicator text-center">
                    R:R {signal.rr}
                  </div>
                  <div className="profit-indicator text-center">
                    {signal.winrate}
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Entry: {signal.entry}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Signal Details & Execution */}
        <Card className="trading-panel lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <span>{selectedSignal.symbol} Signal Details</span>
              <Badge variant={selectedSignal.type === "BUY" ? "default" : "destructive"}>
                {selectedSignal.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Signal Details</TabsTrigger>
                <TabsTrigger value="execute">Execute Trade</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                {/* Price Levels */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="trading-metric font-semibold text-foreground">Entry & Stop Loss</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                        <span className="text-sm text-muted-foreground">Entry Price</span>
                        <span className="price-display text-sm text-primary">{selectedSignal.entry}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
                        <span className="text-sm text-muted-foreground">Stop Loss</span>
                        <span className="price-display text-sm text-destructive">{selectedSignal.sl}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="trading-metric font-semibold text-foreground">Take Profit Levels</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 rounded bg-success/10">
                        <span className="text-xs text-muted-foreground">TP1</span>
                        <span className="trading-metric text-success">{selectedSignal.tp1}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-success/10">
                        <span className="text-xs text-muted-foreground">TP2</span>
                        <span className="trading-metric text-success">{selectedSignal.tp2}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-success/10">
                        <span className="text-xs text-muted-foreground">TP3</span>
                        <span className="trading-metric text-success">{selectedSignal.tp3}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signal Analytics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{selectedSignal.rr}</div>
                    <div className="text-xs text-muted-foreground">Risk:Reward</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-success">{selectedSignal.winrate}</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{selectedSignal.strength}</div>
                    <div className="text-xs text-muted-foreground">Signal Strength</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="execute" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Order Size (Lots)</label>
                    <div className="flex space-x-2 mt-1">
                      {["0.01", "0.10", "0.50", "1.00"].map((size) => (
                        <Button
                          key={size}
                          variant={orderSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setOrderSize(size)}
                          className="flex-1"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className={`h-16 text-lg font-semibold ${
                        selectedSignal.type === "BUY" 
                          ? "profit-gradient text-white shadow-lg" 
                          : "bg-secondary text-secondary-foreground"
                      }`}
                      disabled={selectedSignal.type !== "BUY"}
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Execute BUY
                    </Button>
                    
                    <Button 
                      className={`h-16 text-lg font-semibold ${
                        selectedSignal.type === "SELL" 
                          ? "loss-gradient text-white shadow-lg" 
                          : "bg-secondary text-secondary-foreground"
                      }`}
                      disabled={selectedSignal.type !== "SELL"}
                    >
                      <TrendingDown className="w-5 h-5 mr-2" />
                      Execute SELL
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                    <Target className="w-4 h-4 inline mr-1" />
                    Auto TP/SL will be set according to signal parameters. Risk: {orderSize} lots at {selectedSignal.rr} ratio.
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};