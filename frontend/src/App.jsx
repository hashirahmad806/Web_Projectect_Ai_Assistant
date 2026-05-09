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
import AboutScreen  from "./screens/AboutScreen";
import DevProfileScreen from "./screens/DevProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useState, useEffect } from "react";

export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, [authToken]);

  return (
    <>
      {/* Animated background orbs (rendered behind everything via CSS z-index 0) */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />
      <div className="orb orb-3" aria-hidden />

      <Shell>
        <Routes>
          <Route path="/login"       element={<LoginScreen setAuthToken={setAuthToken} />} />
          <Route path="/register"    element={<RegisterScreen setAuthToken={setAuthToken} />} />
          <Route path="/"            element={<HomeScreen />}       />
          <Route path="/chat"        element={<ChatScreen />}       />
          <Route path="/voice"       element={<VoiceScreen />}      />
          <Route path="/image"       element={<ImageScreen />}      />
          <Route path="/history"     element={<HistoryScreen />}    />
          <Route path="/about"       element={<AboutScreen />}      />
          <Route path="/about/:slug" element={<DevProfileScreen />} />
        </Routes>
      </Shell>
    </>
  );
}
