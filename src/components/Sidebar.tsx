import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: 200, background: "#0f1724", color: "#fff", padding: 16 }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li><Link to="/" style={{ color: "#fff" }}>dashboard</Link></li>
        <li><Link to="/chart" style={{ color: "#fff" }}>trading / chart</Link></li>
        <li><Link to="/signals" style={{ color: "#fff" }}>signals</Link></li>
        <li><Link to="/history" style={{ color: "#fff" }}>history</Link></li>
      </ul>
    </aside>
  );
}
