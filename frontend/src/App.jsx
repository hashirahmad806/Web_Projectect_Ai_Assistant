/**
 * App.jsx — Root application component
 * Home page renders as a standalone full-width landing page.
 * All other screens use the Shell sidebar layout.
 */

import { Route, Routes } from "react-router-dom";
import Shell           from "./components/Shell";
import ProtectedRoute  from "./components/ProtectedRoute";
import HomeScreen      from "./screens/HomeScreen";
import ChatScreen      from "./screens/ChatScreen";
import VoiceScreen     from "./screens/VoiceScreen";
import ImageScreen     from "./screens/ImageScreen";
import HistoryScreen   from "./screens/HistoryScreen";
import AboutScreen     from "./screens/AboutScreen";
import DevProfileScreen from "./screens/DevProfileScreen";
import LoginScreen     from "./screens/LoginScreen";
import RegisterScreen  from "./screens/RegisterScreen";
import { useState, useEffect } from "react";

export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); }
      catch (e) { console.error(e); }
    }
  }, [authToken]);

  return (
    <>
      <Routes>
        {/* ── Standalone full-width pages (no sidebar) ── */}
        <Route path="/"         element={<HomeScreen />} />
        <Route path="/login"    element={<LoginScreen setAuthToken={setAuthToken} />} />
        <Route path="/register" element={<RegisterScreen setAuthToken={setAuthToken} />} />

        {/* ── App pages with sidebar Shell (protected) ── */}
        <Route path="/*" element={
          <ProtectedRoute>
            <Shell>
              <Routes>
                <Route path="/chat"        element={<ChatScreen />}       />
                <Route path="/voice"       element={<VoiceScreen />}      />
                <Route path="/image"       element={<ImageScreen />}      />
                <Route path="/history"     element={<HistoryScreen />}    />
                <Route path="/about"       element={<AboutScreen />}      />
                <Route path="/about/:slug" element={<DevProfileScreen />} />
              </Routes>
            </Shell>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

