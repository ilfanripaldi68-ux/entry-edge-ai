import React from "react";

type Props = {
  active: string;
  onNavigate: (r: "dashboard" | "trading" | "settings") => void;
};

export default function Sidebar({ active, onNavigate }: Props) {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "trading", label: "Trading Panel" },
    { key: "settings", label: "Settings" }
  ];
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-slate-800">Entry Edge AI</div>
      <nav className="p-4 flex-1">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onNavigate(it.key as any)}
            className={`w-full text-left block px-3 py-2 mb-2 rounded ${active === it.key ? "bg-slate-700" : "hover:bg-slate-800"}`}
          >
            {it.label}
          </button>
        ))}
      </nav>
      <div className="p-4 text-sm text-slate-400 border-t border-slate-800">Live: Binance public</div>
    </aside>
  );
}
