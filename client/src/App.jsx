import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { ChatProvider } from "./context/ChatContext";

const App = () => {
  return (
    <>
      <Routes>
        {/* ── Public routes with site header ── */}
        <Route
          path="/"
          element={
            <>
              <SiteHeader />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <SiteHeader />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <SiteHeader />
              <Register />
            </>
          }
        />

        {/* ── Protected chat route — no site header, full screen ── */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatProvider>
                <Chat />
              </ChatProvider>
            </ProtectedRoute>
          }
        />

        {/* ── Fallback ── */}
        <Route path="/404" element={<><SiteHeader /><NotFound /></>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;
