import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NotAuth from "../NotAuth";
import { fetchUserPermissions } from "../Permissions/Permission";

function Protected({ children }) {
  const [permissions, setPermissions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const permision = await fetchUserPermissions();
      setPermissions(permision);
      console.log(permissions, "permission");
    } catch (error) {
      console.log(error);
    }
  };

  const portValue = permissions;

  console.log(portValue[1], "here");
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default Protected;
