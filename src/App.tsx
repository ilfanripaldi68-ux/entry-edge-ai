import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Trading from "./pages/trading";
import Chart from "./pages/chart";
import Signals from "./pages/signals";
import History from "./pages/history";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<dashboard />} />
            <Route path="/trading" element={<trading />} />
            <Route path="/chart" element={<chart />} />
            <Route path="/signals" element={<signals />} />
            <Route path="/history" element={<history />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
