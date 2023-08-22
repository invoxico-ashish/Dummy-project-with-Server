import React, { useEffect, useState } from "react";
import "./Style/LoginPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RotateLoader from "react-spinners/RotateLoader";

function AdminHome() {
  const id = localStorage.getItem("admin_id");
  const [values, setValues] = useState({ email: "", password: "" });
  let [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    // passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null],"Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const Navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const onSubmit = async (err, data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      axios
        .post("http://localhost:8000/api/login", values)
        .then((res) => {
          // console.log(res.data, "res");
          localStorage.setItem("token", res.data.token, res.data.admin_id);
          localStorage.setItem("admin_id", res.data.admin_id);
          if (res.data.success === true) {
            Navigate("/dashboard");
          } else {
            toast.error("Invalid Credentials", {
              position: toast.POSITION.TOP_RIGHT,
              className: "toast-message",
            });
            console.log(err);
          }
        })
        .catch((err) => console.log(err));
    }, 2000);
  };

  return (
    <>
      <div>
        <div className="bodyDiv">
          <div className="Form-cont">
            {loading ? (
              <RotateLoader
                color="#36d7b7"
                loading={loading}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>
                <div className="logo">
                  <h1>Login Page</h1>
                </div>
                <div className="input-container">
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="inp-cont">
                      <label className="form-lable">
                        Email<span className="textdanger">*</span>
                      </label>
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
                    <div className="inp-cont">
                      <label className="form-lable">
                        Password<span className="textdanger">*</span>
                      </label>
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
                    <div className="inp-cont">
                      <button className="btn btn-success">Submit</button>
                    </div>
                    <ToastContainer />
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
