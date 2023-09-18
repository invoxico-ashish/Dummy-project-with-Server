import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Settings() {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [webLogo, setWebLogo] = useState([]);
  const [favLogo, setFavLogo] = useState([]);
  const [values, setValues] = useState({
    email: "",
    address: "",
    websiteName: "",
    mobile: "",
    fb: "",
    insta: "",
    linkedin: "",
    twitter: "",
  });
  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    setWebLogo(file);
  };
  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    setFavLogo(file);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    const formDataObject = Object.fromEntries(formData.entries());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`http://localhost:8000/api/general/settings`, formData, config)
      .catch((err) => console.log(err));
    try {
      if (webLogo || favLogo) {
        const imageFormData = new FormData();
        if (webLogo) {
          imageFormData.append("webLogo", webLogo);
        }
        if (favLogo) {
          imageFormData.append("favLogo", favLogo);
        }
        const imageResponse = axios
          .post(
            "http://localhost:8000/api/setting/images",
            imageFormData,
            config
          )
          .then((res) =>
            toast.success("Updated Successfuly ", {
              position: toast.POSITION.TOP_RIGHT,
            })
          )
          .then((res) =>
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          );
      }
    } catch (err) {
      console.error(err);
    }
  };
  const inputfilled = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/get/genral/settings`
      );
      const data = result.data.keyValuePairs;
      console.log(data,"data");
      // return
      setValues({
        ...values,
        email: data.email,
        address: data.address,
        websiteName: data.websiteName,
        mobile: data.mobile,
        fb: data.fb,
        insta: data.insta,
        linkedin: data.linkedin,
        twitter: data.twitter,
        webLogo: data.webLogo,
        favLogo: data.favLogo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inputfilled();
  }, []);

  return (
    <div className="homeie setting">
      <div className="set-container">
        <div>
          <h3>General Website Settings</h3>
        </div>
        <form className="input-cont" encType="multipart/form-data">
          <div className="row_input row">
            <div className="col">
              <label>Email -</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label>Address -</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Address"
                aria-label="Address"
                value={values.address}
                onChange={(e) =>
                  setValues({ ...values, address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>Website name -</label>
              <input
                type="text"
                name="websiteName"
                className="form-control"
                placeholder="Website name"
                aria-label="Website name"
                value={values.websiteName}
                onChange={(e) =>
                  setValues({ ...values, websiteName: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label>Contact number -</label>
              <input
                type="number"
                name="mobile"
                className="form-control"
                placeholder="Contact number"
                aria-label="AdContact numberdress"
                value={values.mobile}
                onChange={(e) =>
                  setValues({ ...values, mobile: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>fb -</label>
              <input
                type="text"
                name="fb"
                className="form-control"
                placeholder="fb"
                aria-label="fb"
                value={values.fb}
                onChange={(e) => setValues({ ...values, fb: e.target.value })}
              />
            </div>
            <div className="col">
              <label>insta -</label>
              <input
                type="text"
                name="insta"
                className="form-control"
                placeholder="insta"
                aria-label="insta"
                value={values.insta}
                onChange={(e) =>
                  setValues({ ...values, insta: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>LinkedIn -</label>
              <input
                type="text"
                name="linkedin"
                className="form-control"
                placeholder="LinkedIn"
                aria-label="LinkedIn"
                value={values.linkedin}
                onChange={(e) =>
                  setValues({ ...values, linkedin: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label>twitter -</label>
              <input
                type="text"
                name="twitter"
                className="form-control"
                placeholder="twitter"
                aria-label="twitter"
                value={values.twitter}
                onChange={(e) =>
                  setValues({ ...values, twitter: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>Website Logo -</label>
              <input
                type="file"
                accept="image/*"
                name="webLogo"
                className="form-control"
                onChange={handleImage1Change}
              />
              {values.webLogo && (
                <>
                  <img
                    src={`http://localhost:8000/img/${values.webLogo}`}
                    width="100"
                  />
                  <div>Selected file: {values.webLogo}</div>
                </>
              )}
            </div>

            <div className="col">
              <label>Fav Icon -</label>
              <input
                type="file"
                accept="image/*"
                name="favLogo"
                className="form-control"
                onChange={handleImage2Change}
              />
              {values.favLogo && (
                <>
                  <img
                    src={`http://localhost:8000/img/${values.favLogo}`}
                    width="100"
                  />
                  <div>Selected file: {values.favLogo}</div>
                </>
              )}
            </div>
          </div>
        </form>
        <button onClick={handleClick} className="btn btn-danger btn-sm">
          submit
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Settings;
