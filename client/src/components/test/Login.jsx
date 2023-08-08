import React, { useState } from "react";
import "../admin/Style/LoginPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const Navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const onSubmit = async (err, data) => {
    console.log(data);
    await axios
      .post("http://localhost:8000/api/login", values)
      .then((res) => {
        console.log(res, "res");
        localStorage.setItem("token", res.data.token);
        if (res.data.success === true) {
          Navigate("/dashboard");
        } else {
          alert("Error");
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="bodyDiv">
        <div className="Form-cont">
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
                  {errors.email?.type === "required" && "email is required"}
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
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
