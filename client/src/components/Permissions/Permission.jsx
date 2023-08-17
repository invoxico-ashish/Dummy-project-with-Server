import axios from "axios";

const id = localStorage.getItem("admin_id");
export const fetchUserPermissions = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/permision/values/module/${id}`
    );
    // const data = await response.json();
    console.log(response.data.result, "res");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return [];
  }
};

export const hasPermission = (userPermissions, requiredPermission) => {
  return userPermissions.includes(requiredPermission);
};
