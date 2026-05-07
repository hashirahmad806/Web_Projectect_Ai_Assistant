/**
 * App.jsx — Root application component
 * Wires up React Router with the Shell layout and all screen components.
 * Each screen is a separate file in src/screens/ for clean architecture.
 */

import { Route, Routes } from "react-router-dom";
import Shell        from "./components/Shell";
import HomeScreen   from "./screens/HomeScreen";
import ChatScreen   from "./screens/ChatScreen";
import VoiceScreen  from "./screens/VoiceScreen";
import ImageScreen  from "./screens/ImageScreen";
import HistoryScreen from "./screens/HistoryScreen";

export default function App() {
  return (
    <>
      {/* Animated background orbs (rendered behind everything via CSS z-index 0) */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />
      <div className="orb orb-3" aria-hidden />

      <Shell>
        <Routes>
          <Route path="/"        element={<HomeScreen />}    />
          <Route path="/chat"    element={<ChatScreen />}    />
          <Route path="/voice"   element={<VoiceScreen />}   />
          <Route path="/image"   element={<ImageScreen />}   />
          <Route path="/history" element={<HistoryScreen />} />
        </Routes>
      </Shell>
    </>
  );
}
