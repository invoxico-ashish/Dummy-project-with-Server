import React, { useEffect, useState } from "react";
// import "./About.css";
import { Link } from "react-router-dom";
import about from "../Images/about-img.jpg";
import axios from "axios";

function About() {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const AboutData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get/about/data"
        );
        // console.log(response.data.heading);
        setAboutData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    AboutData();
  }, []);
  return (
    <>
      <section className="about_section ">
        <div className="container-fluid">
          <div className="row">
            <div className="img-box col-lg-8 col-md-7">
              <img src={about} alt="" />
            </div>
            <div className="detail-box detail_box_common col-lg-4 col-md-5 text_center">
              <div className="heading_container heading_center">
                <h2>{aboutData.heading}</h2>
              </div>
              <p>{aboutData.desciption}</p>
              <Link>Read More</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
