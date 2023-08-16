import React from "react";
import axios from "axios";

const id = localStorage.getItem("admin_id");
export const fetchUserPermissions = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/permision/values/module/${id}`
    );
    return response.data.result

  } catch (error) {
    console.error("Error fetching permissions:", error);
    return [];
  }
};

export const hasPermission = (userPermissions, requiredPermission) => {
  return userPermissions.includes(requiredPermission);
};
