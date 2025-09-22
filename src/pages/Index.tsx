import { useState } from "react";
import { TradingNavigation } from "@/components/TradingNavigation";
import { DashboardOverview } from "@/components/DashboardOverview";
import { TradingPanel } from "@/components/TradingPanel";
import { ChartPanel } from "@/components/ChartPanel";
import { SignalsPanel } from "@/components/SignalsPanel";
import { HistoryPanel } from "@/components/HistoryPanel";

type ActivePanel = "dashboard" | "trading" | "chart" | "signals" | "history";

const Index = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>("dashboard");

  const renderActivePanel = () => {
    switch (activePanel) {
      case "dashboard":
        return <DashboardOverview />;
      case "trading":
        return <TradingPanel />;
      case "chart":
        return <ChartPanel />;
      case "signals":
        return <SignalsPanel />;
      case "history":
        return <HistoryPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Trading App Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg trading-gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TS</span>
              </div>
              <div>
                <h1 className="trading-title text-foreground">Trading Signal Robot</h1>
                <p className="text-xs text-muted-foreground">Professional Trading Assistant</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="trading-metric text-success">
              <span className="text-xs">Live Status</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Navigation Sidebar */}
        <TradingNavigation 
          activePanel={activePanel} 
          onPanelChange={setActivePanel} 
        />

        {/* Main Panel Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="fade-in">
            {renderActivePanel()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;