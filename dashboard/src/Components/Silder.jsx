import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { TbSlideshow } from "react-icons/tb";
import axios from "axios";
function HomeSec() {
  const Navigate = useNavigate();
  const [slideimg, setSlideimg] = useState([]);

  useEffect(() => {
    const slideimages = async () => {
      try {
        const slideres = await axios.get(
          "http://localhost:8000/api/get/img/slide"
        );
        console.log(slideres.data);
        setSlideimg(slideres.data);
      } catch (error) {
        console.log(error);
      }
    };
    slideimages();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(`would you like to delete the ${id}`);
    if (confirm) {
      axios
        .delete("http://localhost:8000/api/delete/img/" + id)

        .then((response) => {
          console.log(response);
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="d-flex home">
        <div className="content container mt-3 ms-10">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
              <p>Slides</p>
              <TbSlideshow />
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <h2>Slides</h2>
            <Link to={"/editslides"}>
              <button className="btn btn-success">+Add</button>
            </Link>
          </div>
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">Slider_id</th>
                <th scope="col">Title</th>
                <th scope="col">Slide</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {slideimg.map((item, index) => (
                <tr key={index}>
                  <td>{item.slider_id}</td>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/img/${item.image}`}
                      alt=""
                      className="tableImage"
                    />
                  </td>
                  <td>
                    <Link
                      to={`/updateslide/${item.slider_id}`}
                      className="btn btn-success mx-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(item.slider_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HomeSec;
