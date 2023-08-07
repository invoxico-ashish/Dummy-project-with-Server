import React, { useEffect, useState } from "react";
import "./Slider.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "owl.carousel";
import axios from "axios";

function Slider() {
  const [image, setImage] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = image.length;

  useEffect(() => {
    const FetchSlides = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/get/img/slide") ;
        setImage(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchSlides();
  }, []);
  const nextSlide = () => {setCurrent(current === length - 1 ? 0 : current + 1);};
 const prevslide = () => {setCurrent(current === 0 ? length - 1 : current - 1);};
if (!Array.isArray(image) || image.length <= 0) {
    return null;
  }

  return (
    <>
      <div className="slider_section position-relative">
        <div className="container-fluid">
          <div className="row">
            <div className="detail-box col-lg-4 col-md-5">
              <div
                id=""
                className="carousel slide slider_text_carousel"
                data-ride="carousel"
              >
                <div className="carousel-inner"><div className="carousel-item active"><div className="detail_content">
                      <div><h1>
                          Photography <br />
                          Studio</h1>
                        <Link className="">Read more</Link>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item"><div className="detail_content"><div>
                        <h1>
                          Photography <br /> Studio</h1>
                        <Link className="">Read more</Link>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item"><div className="detail_content">
                      <div>
                        <h1>
                          Photography <br />Studio</h1>
                        <Link className="">Read more</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="img-box col-lg-8 col-md-7">
              <div id=""className="carousel slide slider_image_carousel carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                  {image.map((value, index) => (
                    <div className={index === current? "carousel-item active":"carousel-item"}key={index}>
                      {index === current && (<img src={`http://localhost:8000/img/${value.image}`}alt=""/>)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel_btn-box"><Link className="slider_btn_prev"role="button"data-slide="prev">
                  <i className="fa fa-long-arrow-left"aria-hidden="true"onClick={prevslide}><AiOutlineArrowLeft /></i>
                  <span className="sr-only">Previous</span>
                </Link>
                <Link className="slider_btn_next"role="button"data-slide="next">
                  <i className="fa fa-long-arrow-right" aria-hidden="true"onClick={nextSlide}><AiOutlineArrowRight /></i>
                  <span className="sr-only">Next</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
