import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export default function MiniSpark({ data = [] as { value:number }[] }) {
  return (
    <div style={{ width: 120, height: 40 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <Area dataKey="value" stroke="#7c5cff" fill="#27293a" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
