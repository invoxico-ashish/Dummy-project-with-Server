import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Style/Home.css";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import axios from "axios";

function BlogAdmin() {
  const id = localStorage.getItem("admin_id");
  const token = localStorage.getItem("token");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [blog_Title, setBlog_Title] = useState("");
  const [Blog_Status, setBlog_Status] = useState("");
  const [Selected_Category, setSelected_Category] = useState("");
  //   const [Selected_Category_id, setSelected_Category_id] = useState("");
  const [cat_List, setCat_List] = useState([]);
  const [Long_Desc, setLong_Desc] = useState("");
  const [Short_Desc, setShort_Desc] = useState("");
  const [Blog_img, setBlog_img] = useState([]);
  const [blog_list, setBlog_list] = useState([]);
  const [blog_id, setBlog_id] = useState("");
  const handelImageChange = (e) => {
    const file = e.target.files[0];
    setBlog_img(file);
  };
  const handelImageChangetwo = (e) => {
    const file = e.target.files[0];
    setBlog_img(file);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Blog_Title", blog_Title);
    formData.append("Blog_Status", Blog_Status);
    formData.append("Selected_Category", Selected_Category);
    formData.append("Long_Desc", Long_Desc);
    formData.append("Short_Desc", Short_Desc);
    formData.append("Blog_img", Blog_img);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`http://localhost:8000/api/post/blog/create/blog`, formData, config)
      .then((res) => {
        console.log("OK");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(blog_id, "blog_id");
    // return
    const formData = new FormData();
    formData.append("blog_Title", blog_Title);
    formData.append("Blog_Status", Blog_Status);
    formData.append("Selected_Category", Selected_Category);
    formData.append("Short_Desc", Short_Desc);
    formData.append("Long_Desc", Long_Desc);
    formData.append("Blog_img", Blog_img);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `http://localhost:8000/api/update/admin_blog/single_blog/${blog_id}`,
        formData,
        config
      )
      .then((res) => {
        console.log("okioki");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openModal = async () => {
    await axios
      .get(`http://localhost:8000/api/get/category/list/all`)
      .then((res) => {
        setCat_List(res.data.result);
      });

    setIsOpen(true);
  };
  const closeModel = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setEditModalOpen(false);
  };
  const closeEditModel = () => {
    setEditModalOpen(false);
  };
  const editOpen = async (id) => {
    console.log(id, "id");
    setBlog_id(id);

    await axios
      .get(`http://localhost:8000/api/get/category/list/all`)
      .then((res) => {
        setCat_List(res.data.result);
      });

    setEditModalOpen(true);
  };

  const get_blog_data = async () => {
    await axios
      .get(`http://localhost:8000/api/get/blog/list/all`)
      .then((res) => {
        setBlog_list(res.data.result);
      });
  };

  const handleDelete = (id) => {
    axios
      .put(`http://localhost:8000/api/delete/blog/single/${id}`)
      .then((res) => {
        console.log("ok");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_blog_data();
  }, []);
  const customStyles = {
    content: {
      top: "50%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      height: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <div className="top">
        <div className="parent_div">
          <div className="child_div">
            <div className="top-section">
              <h5>Blogs</h5>

              <div>
                <Link>
                  <BsPlusCircleFill
                    size={30}
                    color="#49bfaf"
                    onClick={openModal}
                  />
                </Link>
              </div>
            </div>
            <div className="content-table">
              <table className="table table-striped table-dark blog_tble">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Status</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blog_list.map((blog) => (
                    <tr key={blog.blog_id}>
                      <th scope="row">{blog.blog_id}</th>
                      <td>{blog.blog_Title}</td>
                      <td>{blog.blog_Status === "1" ? "Publish" : "Hide"}</td>
                      <td>{blog.Cat_Title}</td>
                      <td>{blog.blog_Publish_Date}</td>
                      <td>
                        <div className="buttons">
                          <div>
                            <Link>
                              <BiEdit
                                color="white"
                                size={20}
                                onClick={() => editOpen(blog.blog_id)}
                              />
                            </Link>
                          </div>
                          <div>
                            <Link>
                              <MdDeleteSweep
                                color="white"
                                size={20}
                                onClick={() => handleDelete(blog.blog_cat_id)}
                              />
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
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModel}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4>Create New Blog</h4>
        </div>
        <form className="Modal_form">
          <div className="main_cont">
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Name</h6>
              </div>
              <input
                type="text"
                name="name"
                className="input_select"
                onChange={(e) => {
                  setBlog_Title(e.target.value);
                }}
              />
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Status </h6>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                name="select_link"
                onChange={(e) => {
                  setBlog_Status(e.target.value);
                }}
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
                  setSelected_Category(e.target.value);
                }}
              >
                <option selected>Select</option>
                {cat_List.map((cat) => (
                  <option key={cat.Cat_id} value={cat.Cat_id}>
                    {cat.Cat_Title}
                  </option>
                ))}
              </select>
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Short Desc</h6>
              </div>
              <input
                type="text"
                name="name"
                className="input_select"
                onChange={(e) => {
                  setShort_Desc(e.target.value);
                }}
              />
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Long Desc</h6>
              </div>
              <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
                onChange={(e) => {
                  setLong_Desc(e.target.value);
                }}
              />
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Image</h6>
              </div>
              <input
                type="file"
                name="Blog_img"
                className="input_select"
                onChange={handelImageChange}
              />
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
        onRequestClose={closeModel}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4>Edit Blog</h4>
        </div>
        <form className="Modal_form">
          <div className="main_cont">
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Name</h6>
              </div>
              <input
                type="text"
                name="name"
                className="input_select"
                onChange={(e) => setBlog_Title(e.target.value)}
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
                onChange={(e) => {
                  setSelected_Category(e.target.value);
                }}
              >
                <option selected>Select</option>
                {cat_List.map((cat) => (
                  <option key={cat.Cat_id} value={cat.Cat_id}>
                    {cat.Cat_Title}
                  </option>
                ))}
              </select>
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Status</h6>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                name="select_link"
                onChange={(e) => {
                  setBlog_Status(e.target.value);
                }}
              >
                <option selected>Select</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Short Desc</h6>
              </div>
              <input
                type="text"
                name="name"
                className="input_select"
                onChange={(e) => {
                  setShort_Desc(e.target.value);
                }}
              />
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Long Desc</h6>
              </div>
              <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
                onChange={(e) => {
                  setLong_Desc(e.target.value);
                }}
              />
            </div>
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Blog Image</h6>
              </div>
              <input
                type="file"
                name="Blog_img"
                className="input_select"
                onChange={handelImageChangetwo}
              />
            </div>

            <div className="third_child_input">
              <div className="first_but"></div>
              <button className="" onClick={closeModel}>
                close
              </button>
              <div className="sec_but">
                <button className="" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default BlogAdmin;
