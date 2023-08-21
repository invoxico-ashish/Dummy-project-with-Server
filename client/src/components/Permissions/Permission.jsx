import axios from "axios";

const id = localStorage.getItem("admin_id");
export const fetchUserPermissions = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/permision/values/module/${id}`
    );
    const resTwo = response.data.result;

    {
      const maping = Object.entries(resTwo).map(([key, value]) => {
        let permission = value.permission_value;
        let module = value.module_id;
        // console.log("permission:", permission, "module_id", module);
        const per = { permission, module };
        return per;
      });

      return maping;
    }
  } catch (error) {
    console.error("Error fetching permissions:", error);
  }
};

export const checkPermission = (fetchUserPermissions, module) => {
  console.log(fetchUserPermissions, module, "jkchiw9hfw");
};

// export const hasPermission = (userPermissions, requiredPermission) => {
// return userPermissions.includes(requiredPermission);
// };
