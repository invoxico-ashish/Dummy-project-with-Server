import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import axios from "axios";
import Modal from "react-modal";
import { fetchUserPermissions } from "../Permissions/Permission";
import { BiEdit, BiCommentEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function NavigationSystem() {
  const mod_id = 4;
  const id = localStorage.getItem("admin_id");
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editmodalIsOpen, setEditmodalIsOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [updatemoduleName, setUpdateModuleName] = useState("");
  const [isActive, setIsActive] = useState("");
  const [active, setActive] = useState("");
  const [updateID, setUpdateID] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    // console.log(permissions,"permissions")
    setUserPermissions(permissions);
  };
  const firstValue = userPermissions[mod_id];
  // console.log(firstValue,"oih")

  const getModules = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/get/navigate/modules`
    );

    setModules(res.data.data);
  };
  const result = {};
  modules.forEach((item) => {
    result[item.Modules] = item.navigate_id;
  });
  const toggleSwitch = (index) => {
    const updatedToggleStates = [...toggleStates];
    updatedToggleStates[index] = !updatedToggleStates[index];
    setToggleStates(updatedToggleStates);
    const isChecked = updatedToggleStates[index];
    const valuess = isChecked ? 1 : 0;
    setIsActive(valuess);
  };
  // const handleActive = async (id) => {
  //   const updateStatus = await axios
  //     .put(`http://localhost:8000/api/post/nav_module/status/active/${id}`, {
  //       status: isActive,
  //     })
  //     .then((res) => {
  //       toast.success("Updated Successfuly ", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Request Denied ", { position: toast.POSITION.TOP_RIGHT });
  //     });
  // };

  const handleButClick = () => {
    Navigate("/dashboard");
  };
  const handleModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setEditmodalIsOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/api/post/nav_module`, {
        module_name: moduleName,
      })
      .then((res) => {
        toast.success("Created Successfuly ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Denied ", { position: toast.POSITION.TOP_RIGHT });
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8000/api/update/nav_module/module/name/${updateID}`,
        { Modules: updatemoduleName, active: active }
      )
      .then((res) => {
        toast.success("Updated Successfuly ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Denied ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleOpenModal = (id) => {
    setUpdateID(id);
    setEditmodalIsOpen(true);
  };

  const GetModules = async (id) => {
    const response = await axios
      .get(
        `http://localhost:8000/api/get/navigation_modules/single/module/${id}`
      )
      .then((res) => {
        const singlevalue = res.data.result[0];
        setUpdateModuleName(singlevalue.Modules);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getModules();
    fetchPermissions();
  }, []);
  return (
    <>
      <div className="top">
        <div className="first-top">
          <h1>Navigations</h1>
          <div className="back_but">
            <button onClick={handleButClick}>Back</button>
          </div>
        </div>
        {id === "20" || firstValue == 2 ? (
          <div className="add_module">
            <button onClick={handleModal}>Add+</button>
          </div>
        ) : (
          ""
        )}

        <div className="main-cont">
          <div className="navigate-home">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((value, index) => (
                  <tr key={index}>
                    <th scope="row">{value.navigate_id}</th>
                    <td>{value.Modules}</td>
                    <td>
                      <div className="buttons">
                        {id === "20" || firstValue == 2 ? (
                          <div>
                            <Link>
                              <BiEdit
                                color="white"
                                size={20}
                                onClick={() => {
                                  handleOpenModal(value.navigate_id);
                                  GetModules(value.navigate_id);
                                  setActive(value.mod_status);
                                }}
                              />
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                        <div>
                          <Link
                            to={
                              value.navigate_id == 1
                                ? `/navigateheader/${value.navigate_id}`
                                : value.navigate_id == 2
                                ? `/navigatefooter/${value.navigate_id}`
                                : ""
                            }
                          >
                            <BiCommentEdit color="white" size={20} />
                          </Link>
                        </div>
                      </div>
                      {console.log(value.navigate_id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4>Create New Module</h4>
        </div>
        <form className="Modal_form">
          <div className="main_cont">
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Module Name</h6>
              </div>
              <input
                type="text"
                name="name"
                // value={moduleName}
                className="input_select"
                onChange={(e) => {
                  setModuleName(e.target.value);
                }}
              />
            </div>
            <div className="third_child_input">
              <div className="first_but"></div>
              <button className="" onClick={closeModal}>
                close
              </button>
              <div className="sec_but">
                <button className="" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={editmodalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4>Update Module </h4>
        </div>
        <form className="Modal_form">
          <div className="main_cont">
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Module Name</h6>
              </div>
              <input
                type="text"
                name="Modules "
                className="input_select"
                value={updatemoduleName}
                onChange={(e) => {
                  setUpdateModuleName(e.target.value);
                }}
              />
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Status</h6>
              </div>

              <select
                className="form-select"
                aria-label="Default select example"
                name="select_link"
                value={active}
                onChange={(e) => {
                  setActive(e.target.value);
                }}
              >
                <option selected>Select</option>
                <option value="1">active</option>
                <option value="0">inactive</option>
              </select>
            </div>
            <div className="third_child_input">
              <div className="first_but"></div>
              <button className="" onClick={closeModal}>
                close
              </button>
              <div className="sec_but">
                <button className="" onClick={handleUpdate}>
                  Updated Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default NavigationSystem;
