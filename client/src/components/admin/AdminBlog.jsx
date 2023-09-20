import React, { useState, useEffect } from "react";
import "./Style/Home.css";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { fetchUserPermissions } from "../Permissions/Permission";
import NotAuth from "../NotAuth";

function AdminBlog() {
  const mod_id = 5;
  const id = localStorage.getItem("admin_id");
  const token = localStorage.getItem("token");
  const [userPermissions, setUserPermissions] = useState([]);
  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
  };
  const firstValue = userPermissions[mod_id];

  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [module_name, setModule_name] = useState("");
  const [cat_Category, setCat_Category] = useState("");
  const [mod_isActive, setMod_isActive] = useState("");
  const [mod_Options, setMod_Options] = useState([]);
  const [blog_mod_data, setBlog_mod_data] = useState([]);
  const [checkedMap, setCheckedMap] = useState({});
  const [cat_parent, setCat_Parent] = useState("");
  const [selected_id, setSelected_id] = useState("");
  const [show_cat_inp, setShow_cat_inp] = useState([]);

  const openModal = async () => {
    await axios
      .get(`http://localhost:8000/api/get/blog_category/all`)
      .then((res) => {
        setMod_Options(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsOpen(true);
  };
  const closeModel = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleClick = (e, id) => {
    const isChecked = e.target.checked;
    setCheckedMap((prevCheckedMap) => ({ ...prevCheckedMap, [id]: isChecked }));
    // isChecked
    //   ? console.log(e.target.checked, id)
    //   : console.log(e.target.checked, id);
    const module_stat = isChecked ? 1 : 0;

    axios
      .put(`http://localhost:8000/api/put/admin_cat/category/status/${id}`, {
        module_stat: module_stat,
      })
      .then((res) => {
        toast.success("Updated Successfuly ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Denied ", { position: toast.POSITION.TOP_RIGHT });
      });
  };
  const handleEditclick = (id, status, title, parent) => {
    setModule_name(title);
    setMod_isActive(status);
    setCat_Parent(parent);
    setSelected_id(id);
    axios
      .get(`http://localhost:8000/api/get/blog_category/all`)
      .then((res) => {
        setMod_Options(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8000/api/get/category/test/${id}`)
      .then((res) => {
        setShow_cat_inp(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditModalOpen(true);
  };
  const closeEditModel = () => {
    setEditModalOpen(false);
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/delete/blog_cat/blog/category/${id}`)
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
        toast.error("Request Denied ", { position: toast.POSITION.TOP_RIGHT });
      });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const requestData = {
      module_name: module_name,
      mod_isActive: mod_isActive,
      category: cat_Category,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `http://localhost:8000/api/post/category/new/cat`,
        requestData,
        config
      )
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
  const handleUpdateClick = async (e) => {
    e.preventDefault();
    const updateData = {
      Cat_Title: module_name,
      Cat_Parent: cat_parent,
      Cat_Status: mod_isActive,
    };
    await axios
      .put(
        `http://localhost:8000/api/update/category/cat/${selected_id}`,
        updateData
      )
      .then((res) => {
        toast.success("Created Successfuly ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        toast.error("Request Denied ", { position: toast.POSITION.TOP_RIGHT });
      });
  };

  const Fetch_blog_mod = async () => {
    await axios
      .get(`http://localhost:8000/api/get/category/cat_mod/act`)
      .then((res) => {
        setBlog_mod_data(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Fetch_blog_mod();
    fetchPermissions();
  }, []);

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

  return (
    <>
      {firstValue === 0 ? (
        <NotAuth />
      ) : firstValue === "1" || "2" || id === "20" ? (
        <>
          <div className="top">
            <div className="parent_div">
              <div className="child_div">
                <div className="top-section">
                  <h5>Blog Category System</h5>
                  {firstValue === 2 || id === "20" ? (
                    <div>
                      <Link>
                        <BsPlusCircleFill
                          size={30}
                          color="#49bfaf"
                          onClick={openModal}
                        />
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="content-table">
                  <table className="table table-striped table-dark blog_tble">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cat_Title</th>
                        {firstValue === 2 || id === "20" ? (
                          <>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {blog_mod_data.map((value) => (
                        <tr key={value.Cat_id}>
                          <th scope="row">{value.Cat_id}</th>
                          <td>{value.Cat_Title}</td>
                          {firstValue === 2 || id === "20" ? (
                            <>
                              <td>
                                <div className="form-check form-switch switch_inp">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`flexSwitchCheckChecked_${value.blog_id}`}
                                    checked={
                                      checkedMap[value.Cat_id] ||
                                      value.Cat_Status === "1"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      handleClick(e, value.Cat_id);
                                    }}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="buttons">
                                  <div>
                                    <Link>
                                      <BiEdit
                                        color="white"
                                        size={20}
                                        onClick={() => {
                                          handleEditclick(
                                            value.Cat_id,
                                            value.Cat_Status,
                                            value.Cat_Title,
                                            value.Cat_Parent
                                          );
                                        }}
                                      />
                                    </Link>
                                  </div>

                                  <div>
                                    <Link>
                                      <MdDeleteSweep
                                        color="white"
                                        size={20}
                                        onClick={(e) =>
                                          handleDelete(e, value.Cat_id)
                                        }
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeEditModel}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <h4>Create New Category</h4>
            </div>
            <form className="Modal_form">
              <div className="main_cont">
                <div className="sec_child_input">
                  <div className="input_lab">
                    <h6>Category Name</h6>
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="input_select"
                    placeholder="Category Title..."
                    onChange={(e) => {
                      setModule_name(e.target.value);
                    }}
                  />
                </div>
                <div className="sec_child_input">
                  <div className="input_lab">
                    <h6>Category Status </h6>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="select_link"
                    onChange={(e) => setMod_isActive(e.target.value)}
                  >
                    <option selected>Select</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="sec_child_input">
                  <div className="input_lab">
                    <h6>Category</h6>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="select_link"
                    onChange={(e) => {
                      setCat_Category(e.target.value);
                    }}
                  >
                    <option selected>Select</option>
                    {mod_Options.map((value) => (
                      <option value={value.Cat_id}>{value.Cat_Title}</option>
                    ))}
                  </select>
                </div>
                <div className="third_child_input">
                  <div className="first_but"></div>
                  <button className="" onClick={closeModel}>
                    close
                  </button>
                  <div className="sec_but">
                    <button className="" onClick={handleCreate}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
          {/* ------------------------MODAL FOR EDIT CATEGORY----------------------- */}
          <Modal
            isOpen={editModalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeEditModel}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <h4>Edit Category</h4>
            </div>
            <form className="Modal_form">
              <div className="main_cont">
                <div className="sec_child_input">
                  <div className="input_lab">
                    <h6>Category Name</h6>
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="input_select"
                    value={module_name}
                    onChange={(e) => {
                      setModule_name(e.target.value);
                    }}
                  />
                </div>
                <div className="sec_child_input">
                  <div className="input_lab">
                    <h6> Category</h6>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="select_link"
                    value={cat_parent}
                    onChange={(e) => {
                      setCat_Parent(e.target.value);
                    }}
                  >
                    <option selected>Select</option>
                    {show_cat_inp.map((value, index) => (
                      <option value={value.Cat_id}>{value.Cat_Title}</option>
                    ))}
                  </select>
                </div>
                <div className="sec_child_input">
                  <div className="input_lab">
                    <h6>Category Status</h6>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="select_link"
                    value={mod_isActive}
                    onChange={(e) => setMod_isActive(e.target.value)}
                  >
                    <option selected>Select</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="third_child_input">
                  <div className="first_but"></div>
                  <button className="" onClick={closeEditModel}>
                    close
                  </button>
                  <div className="sec_but">
                    <button className="" onClick={handleUpdateClick}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
          <ToastContainer />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default AdminBlog;
