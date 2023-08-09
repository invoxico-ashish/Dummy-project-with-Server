import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

export default Protected;
