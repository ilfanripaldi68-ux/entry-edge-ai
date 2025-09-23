import RealtimeChart from "./components/RealtimeChart";

function App() {
  return (
    <div className="p-6 space-y-6">
      {/* Chart BTCUSDT */}
      <RealtimeChart symbol="BTCUSDT" />

      {/* Chart ETHUSDT */}
      <RealtimeChart symbol="ETHUSDT" />

      {/* Chart Gold */}
      <RealtimeChart symbol="XAUUSDT" />
    </div>
  );
}

export default App;
