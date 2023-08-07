import axios from "axios";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditSlide() {
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imagename, setimageName] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const { id } = useParams();
  const handelimageChange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imagename", imagename);
    formData.append("slideImage", slideImage);
    axios
      .put("http://localhost:8000/api/update/slide/" + id, formData)
      .then((res) => {
        setTitle(res);
      })
      .then((res) => {
        Navigate("/slides");
      });
    console.log(title, imagename, slideImage);
  };

  return (
    <>
      <div className="d-flex home">
        <div className="content container mt-3 ms-10">
          <Link to={"/slides"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To Slides</button>

                {/* <TbSlideshow />    */}
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-around">
            <h2> Update Slides</h2>
          </div>
          <div className="slide-form">
            <div className="slideinput">
              <form encType="multipart/form-data">
                <div className="inp-cont">
                  <label className="form-lable">Name</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="inp-cont">
                  <label className="form-lable">Image Name</label>
                  <input
                    name="img_name"
                    type="text"
                    className="form-control"
                    value={imagename}
                    onChange={(e) => setimageName(e.target.value)}
                  />
                </div>
                <div className="inp-cont">
                  <label>Update Image</label>
                  <br />
                  <input
                    type="file"
                    name="slideImage"
                    accept="image/png,image/jpg, image/jpeg"
                    onChange={handelimageChange}
                  />
                </div>
                <Link className="btn btn-success mx-2" onClick={handleUpdate}>
                  Update
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSlide;
