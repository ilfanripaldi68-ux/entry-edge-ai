import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  History,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActivePanel = "dashboard" | "trading" | "chart" | "signals" | "history";

interface TradingNavigationProps {
  activePanel: ActivePanel;
  onPanelChange: (panel: ActivePanel) => void;
}

const navigationItems = [
  {
    id: "dashboard" as ActivePanel,
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Market Overview"
  },
  {
    id: "trading" as ActivePanel,
    label: "Trading",
    icon: TrendingUp,
    description: "Buy/Sell Panel"
  },
  {
    id: "chart" as ActivePanel,
    label: "Chart",
    icon: BarChart3,
    description: "Live Charts"
  },
  {
    id: "signals" as ActivePanel,
    label: "Signals",
    icon: Zap,
    description: "Entry Signals"
  },
  {
    id: "history" as ActivePanel,
    label: "History",
    icon: History,
    description: "Past Trades"
  }
];

export const TradingNavigation = ({ activePanel, onPanelChange }: TradingNavigationProps) => {
  return (
    <nav className="w-64 bg-card border-r border-border p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-auto p-4 text-left transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "hover:bg-secondary hover:text-secondary-foreground"
              )}
              onClick={() => onPanelChange(item.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className={cn(
                    "text-xs opacity-70",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Settings at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </nav>
  );
};