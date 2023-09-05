import React, { useState } from "react";
import "./Style/Home.css";
import axios from "axios";

function Settings() {
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
    console.log(values);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    // Append the images if they exist
    if (webLogo) {
      formData.append("webLogo", webLogo);
    }
    if (favLogo) {
      formData.append("favLogo", favLogo);
    }

    // const formData = new FormData();

    // // Append each field of the values object
    // Object.keys(values).forEach((key) => {
    //   formData.append(key, values[key]);
    // });

    // // Append the webImages file if it exists
    // if (webImages) {
    //   formData.append("webImages", webImages);
    // }

    // const entries = [];
    // for (const pair of formData.entries()) {
    //   let entryObject = { name: pair[0], value: pair[1] };
    //   entries.push(entryObject);
    //   console.log(entryObject, "obj");
    // }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`http://localhost:8000/api/general/settings`, formData, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="homeie">
      Settings
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
            </div>
          </div>
        </form>
        <button onClick={handleClick} className="btn btn-danger btn-sm">
          submit
        </button>
      </div>
    </div>
  );
}

export default Settings;
