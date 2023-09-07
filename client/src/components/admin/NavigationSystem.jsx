import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import axios from "axios";
import { BiEdit, BiCommentEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

function NavigationSystem() {
  const [modules, setModules] = useState([]);

  const getModules = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/get/navigate/modules`
    );
    // console.log(res.data.data)
    setModules(res.data.data);
    console.log(modules);
  };

  useEffect(() => {
    getModules();
  }, []);
  return (
    <>
      <div className="top">
        <div className="first-top">
          <h1>Navigations</h1>
        </div>
        <div className="main-cont">
          <div className="navigate-home">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((value) => (
                  <tr>
                    <th scope="row">{value.navigate_id}</th>
                    <td>{value.Modules}</td>
                    <td>button</td>
                    <td>
                      <div className="buttons">
                        <div>
                          <Link to={"/navigateheader"}>
                            <BiEdit color="white" size={20} />
                          </Link>
                        </div>
                        <div>
                          <Link>
                            <BiCommentEdit color="white" size={20} />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationSystem;
