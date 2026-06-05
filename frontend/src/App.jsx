import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Report from "./pages/Report"
import Map from "./pages/Map"
import Dashboard from "./pages/Dashboard"
import SOS from "./pages/SOS"
import Chatbot from "./pages/Chatbot"

import { Routes, Route } from "react-router-dom"

function App() {

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/report" element={<Report />} />

        <Route path="/map" element={<Map />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/sos" element={<SOS />} />
        <Route path="/chatbot" element={<Chatbot />} />

      </Routes>

    </div>

  )

}

export default App