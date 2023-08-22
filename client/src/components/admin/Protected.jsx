import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchUserPermissions } from "../Permissions/Permission";

function Protected({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin" replace />;
  } 
    return children;
}

export default Protected;
