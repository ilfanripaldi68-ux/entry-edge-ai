// src/App.tsx
import RealtimeChart from "./components/RealtimeChart";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-3xl p-4">
        <h1 className="text-xl font-bold text-white mb-4 text-center">
          Realtime Chart Demo
        </h1>
        <RealtimeChart />
      </div>
    </div>
  );
}

export default App;
