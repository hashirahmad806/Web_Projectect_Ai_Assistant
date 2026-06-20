/**
 * ProtectedRoute.jsx
 * Wraps routes that require authentication.
 * If no token is found in localStorage, redirects to /login.
 */

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
