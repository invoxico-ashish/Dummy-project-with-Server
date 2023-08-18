import axios from "axios";

const id = localStorage.getItem("admin_id");
export const fetchUserPermissions = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/permision/values/module/${id}`
    );
    // const data = await response.json();
    const resTwo = response.data.result;
    // const arrayAsString = JSON.stringify(resTwo);
   
    // sessionStorage.setItem("permission", resTwo[0].permission_value);
    // sessionStorage.setItem("moduleID", resTwo[0].module_id);
    // sessionStorage.setItem("permission two", resTwo[1].permission_value);
    // sessionStorage.setItem("moduleID two", resTwo[1].module_id);
    // sessionStorage.setItem("permission three", resTwo[2].permission_value);
    // sessionStorage.setItem("moduleID three", resTwo[2].module_id);
    // sessionStorage.setItem("permission for", resTwo[3].permission_value);
    // sessionStorage.setItem("moduleID for", resTwo[3].module_id);

    return resTwo;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return [];
  }
};

export const hasPermission = (userPermissions, requiredPermission) => {
  // return userPermissions.includes(requiredPermission);
};
