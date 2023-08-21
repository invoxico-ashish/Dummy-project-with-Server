import axios from "axios";

const id = localStorage.getItem("admin_id");
export const fetchUserPermissions = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/permision/values/module/${id}`
    );
    const resTwo = response.data.result;
    // console.log(resTwo, "hifuegfi");

    const indexMapping = {};

    const newArr = resTwo.map((item) => {
      const newIndex = item.module_id;
      indexMapping[newIndex] = item.permission_value;
      return newIndex;
    });
    // console.log(newArr, "oneeeeeeeeee");
    // console.log(indexMapping, "newwwwwwwwwwww");
    return indexMapping;

  
   

    // {
    //   let newArrr = resTwo.map((item, index) => ({
    //     index: item.module_id,
    //     permission: item.permission_value,
    //   }));

    //   console.log(newArrr[2], "zserybwET6W");
    // }

    // {
    //   const newArr = resTwo.map((item, index) => {
    //     return index = item.module_id

    //   });
    //   console.log(newArr);
    // }
    // return false;

    // {
    //   const maping = Object.entries(resTwo).map(([key, value]) => {
    //     let permission = value.permission_value;
    //     let module = value.module_id;
    //     // console.log("permission:", permission, "module_id", module);
    //     const per = { permission, module };
    //     return per;
    //     // const per = { permission: permission, module_id: module };
    //     // console.log(per, "kjoihgolsea");
    //   });

    //   return maping;
    // }
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
