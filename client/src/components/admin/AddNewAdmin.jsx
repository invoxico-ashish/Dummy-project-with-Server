import React, { useState } from "react";
import "./Style/LoginPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotAuth from "../NotAuth";

function AddNewAdmin() {
  const id = localStorage.getItem("admin_id");
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [profileImage, setProfileImage] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    Confirmpassword: "",
    number: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfileImage(file);
  };

  const onSubmit = async (err, data) => {
    console.log(values, "juipg");
    const formData = new FormData();
    // Append each field from the values state to the formData
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("Confirmpassword", values.Confirmpassword);
    formData.append("number", values.number);
    formData.append("ProfileImage", profileImage);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // return false;
    await axios
      .post("http://localhost:8000/api/register", formData, values, config)
      .then((res) => {
        if (res.data.message === "already Exists") {
          console.log("alredy exist");
          toast.error("user already exist!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        toast.success("Register Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
        setValues(res);
        setTimeout(() => {
          Navigate("/userlist");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Request Denied", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
        console.log(err);
      });
  };
  return (
    <>
      {id === "20" ? (
        <>
          <div className="bodyDiv">
            <div className="Form-cont increwidth">
              <div className="logo">
                <h1>Register Page</h1>
              </div>
              <div className="input-container">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="inp-cont newcont">
                    <div className="fields">
                      <label className="form-lable">
                        Name<span className="textdanger">*</span>
                      </label>
                      <div className="input-form">
                        <input
                          type="name"
                          name="name"
                          {...register("name", {
                            required: true,
                          })}
                          className="form-control"
                          onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
                          }
                        />
                        <span className="textdanger">
                          {errors.name?.type === "required" &&
                            "name is required"}
                        </span>
                      </div>
                    </div>
                    <div className="fields">
                      <label className="form-lable">
                        Email<span className="textdanger">*</span>
                      </label>
                      <div className="input-form">
                        <input
                          type="email"
                          name="email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                          })}
                          className="form-control"
                          onChange={(e) =>
                            setValues({ ...values, email: e.target.value })
                          }
                        />
                        <span className="textdanger">
                          {errors.email?.type === "required" &&
                            "email is required"}
                          {errors.email?.type === "required " &&
                            "email format is wrong"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="inp-cont">
                    <div className="fields">
                      <label className="form-lable">
                        Password<span className="textdanger">*</span>
                      </label>
                      <div className="input-form">
                        <input
                          type="password"
                          name="password"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                          })}
                          className="form-control"
                          onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                          }
                        />
                        <span className="textdanger">
                          {errors.password?.type === "required" &&
                            "password is required"}
                          {errors.password?.type === "minLength" &&
                            "password is too short"}
                          {errors.password?.type === "maxLength" &&
                            "password is too long"}
                        </span>
                      </div>
                    </div>

                    <div className="fields">
                      <label className="form-lable">
                        Confirm Password<span className="textdanger">*</span>
                      </label>
                      <div className="input-form">
                        <input
                          type="password"
                          name="Confirmpassword"
                          {...register("Confirmpassword", {
                            required: true,
                            validate: (value) => value === watch("password"),
                            minLength: 6,
                            maxLength: 20,
                          })}
                          className="form-control"
                          onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                          }
                        />
                        <span className="textdanger">
                          {errors.Confirmpassword?.type === "required" &&
                            "password is required"}
                          {errors.Confirmpassword?.type === "minLength" &&
                            "password is too short"}
                          {errors.Confirmpassword?.type === "maxLength" &&
                            "password is too long"}
                          {errors.Confirmpasswords?.type === "password" &&
                            "Passwords do not match"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="inp-cont">
                    <div className="fields">
                      <label className="form-lable">
                        Contact Number
                        <span className="textdanger">*</span>
                      </label>
                      <div className="input-form">
                        <input
                          type="number"
                          name="number"
                          {...register("number", {
                            required: true,
                            minLength: 10,
                            maxLength: 12,
                          })}
                          className="form-control"
                          onChange={(e) =>
                            setValues({ ...values, number: e.target.value })
                          }
                        />
                        <span className="textdanger">
                          {errors.number?.type === "required" &&
                            "number is required"}
                          {errors.number?.type === "minLength" &&
                            "number is too short"}
                          {errors.number?.type === "maxLength" &&
                            "number is too long"}
                        </span>
                      </div>
                    </div>

                    <div className="fields">
                      <label className="form-lable">
                        Upload Picture <span className="textdanger">*</span>
                      </label>
                      <div className="input-form">
                        <input
                          type="file"
                          name="ProfileImage"
                          {...register("ProfileImage", {
                            required: true,
                          })}
                          className="form-control"
                          onChange={handleChange}
                        />
                        <span className="textdanger">
                          {errors.ProfileImage?.type === "required" &&
                            "file is required"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="inp-cont">
                    <button className=" btn btn-success">Submit</button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotAuth />
      )}
    </>
  );
}

export default AddNewAdmin;
