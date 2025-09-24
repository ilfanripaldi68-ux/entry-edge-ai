import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { time: "09:00", price: 1.0920 },
  { time: "10:00", price: 1.0935 },
  { time: "11:00", price: 1.0910 },
  { time: "12:00", price: 1.0950 },
];

export default function ChartPage() {
  return (
    <div>
      <h1>📈 Market Chart</h1>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
