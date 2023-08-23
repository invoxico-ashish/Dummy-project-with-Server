import axios from "axios";

export const fetchUserPermissions = async () => {

  try {
    const id = localStorage.getItem("admin_id");
    const response = await axios.get(`http://localhost:8000/api/permision/values/module/${id}`);
    console.log(`http://localhost:8000/api/permision/values/module/${id}`)
    const resTwo = response.data.result;
    const indexMapping = {};

    const newArr = resTwo.map((item) => {
      const newIndex = item.module_id;
      indexMapping[newIndex] = item.permission_value;
      return newIndex;
    });
    return indexMapping;
  } catch (error) {console.error("Error fetching permissions:", error) }
};

// export const checkPermission = (fetchUserPermissions, module) => {
//   console.log(fetchUserPermissions, module, "jkchiw9hfw");
// };


