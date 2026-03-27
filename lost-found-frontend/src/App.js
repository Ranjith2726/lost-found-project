import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";

import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/AnimatedBackground";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import Items from "./pages/Items";

function App() {
  return (
    <Router>

      {/* 🔥 Background fixed behind everything */}
      <AnimatedBackground />

      <div className="app-wrapper">

        <Navbar />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/report-lost" element={<ReportLost />} />
            <Route path="/report-found" element={<ReportFound />} />
            <Route path="/items" element={<Items />} />
          </Routes>
        </div>

      </div>

    </Router>
  );
}

export default App;