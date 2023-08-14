import axios from "axios";
import React, { useEffect, useState } from "react";

function Permissions() {
  const [perData, setPerData] = useState([]);
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");
  const [main, setMain] = useState("");

  const GetPermisionData = async () => {
    try {
      axios
        .get("http://localhost:8000/api/get/permision/data")
        .then((res) => setPerData(res.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetPermisionData();
  }, []);
  const handleChange = (e) => {
    setMain(e.target.value);
  };

  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-warning d-flex justify-content-around px-1 py-3 rounded">
              Permissions s
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <h2></h2>
          </div>
          <table className="table w-50">
            <thead>
              <tr>
                <th scope="col">Module Name</th>
                <th scope="col">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {perData.map((item) => (
                <tr key={item.Permission_id}>
                  <td>{item.module_name}</td>
                  <td>
                    <select name="permissions" onChange={handleChange}>
                      <option value="0">none</option>
                      <option value="1">view</option>
                      <option value="2">edit</option>
                    </select>
                  </td>
                </tr>
              ))}
              {valueOne}
              {valueTwo}
              {valueThree}
              {main }
            </tbody>
          </table>
          <div className="d-flex justify-content-around">
            <button className="btn btn-danger">save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Permissions;
