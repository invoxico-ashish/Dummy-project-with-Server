import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillShareFill } from "react-icons/bs";

function Portfolio() {
  const [portimg, setPortimg] = useState([]);

  useEffect(() => {
    const FetchPortImg = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/get/img/port");
        console.log(res.data);
        setPortimg(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchPortImg();
  }, []);
  return (
    <div>
      <section className="portfolio_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Portfolio</h2>
          </div>
          <div className="portfolio_container ">
            <div className="box-1">
              {portimg.slice(0, 2).map((value, index) => (
                <div className="img-box b-1 b-2" key={index}>
                  <img
                    src={`http://localhost:8000/img/${value.image}`}
                    alt=""
                  />
                  <div className="btn-box">
                    <Link className="btn-1">
                      <i className="fa fa-share-alt" aria-hidden="true">
                        <BsFillShareFill />
                      </i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="box-2">
              {portimg.slice(2, 3).map((value) => (
                <div className="box-2-top">
                  <div className="img-box b-3">
                    <img
                      src={`http://localhost:8000/img/${value.image}`}
                      alt=""
                    />
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        <i className="fa fa-share-alt" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {portimg.slice(3, 4).map((value) => (
              <div className="box-3">
                <div className="img-box b-1">
                  <img
                    src={`http://localhost:8000/img/${value.image}`}
                    alt=""
                  />
                  <div className="btn-box">
                    <a href="" className="btn-1">
                      <i className="fa fa-share-alt" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <div className="img-box b-2">
                  <img
                    src={`http://localhost:8000/img/${value.image}`}
                    alt=""
                  />
                  <div className="btn-box">
                    <a href="" className="btn-1">
                      <i className="fa fa-share-alt" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="img-box b-2">
                <img src={p2} alt="" />
                <div className="btn-box">
                  <a href="" className="btn-1">
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="box-2">
              <div className="box-2-top">
                <div className="img-box b-3">
                  <img src={p3} alt="" />
                  <div className="btn-box">
                    <a href="" className="btn-1">
                      <i className="fa fa-share-alt" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-3">
              <div className="img-box b-1">
                <img src={p4} alt="" />
                <div className="btn-box">
                  <a href="" className="btn-1">
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="img-box b-2">
                <img src={p5} alt="" />
                <div className="btn-box">
                  <a href="" className="btn-1">
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
          <div>
            <Link className="read_btn">See More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
