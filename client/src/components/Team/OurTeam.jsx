import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { BiLogoLinkedin } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
function OurTeam() {
  const [teamImg, setTeamImg] = useState([]);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const TeamImg = async () => {
      try {
        const FetchApi = await axios.get(
          "http://localhost:8000/api/get/our/team"
        );
        // console.log(FetchApi.data.data, "helooooooo");
        setTeamImg(FetchApi.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const TeamData = async () => {
      try {
        const TeamDataApi = await axios.get(
          "http://localhost:8000/api/get/team/data"
        );
        // console.log(TeamDataApi.data.data);
        setTeamData(TeamDataApi.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    TeamImg();
    TeamData();
  }, []);

  return (
    <section className="team_section">
      <div className="container-fluid">
        <div className="row">
          {teamData.map((value, index) => {
            return (
              <div
                className="col-lg-4 col-md-5 detail-box detail_box_common text_center"
                key={index}
              >
                <div className="heading_container heading_center">
                  <h2>{value.title}</h2>
                </div>
                <p>{value.description}</p>
              </div>
            );
          })}

          <div className="col-lg-8 col-md-7 team_container text_center">
            <div className="row">
              {" "}
              {teamImg.map((value, index) => (
                <div className="col-sm-6 mx-auto team-cont">
                  <div className="team_box " key={index}>
                    <div className="img-box">
                      <img
                        src={`http://localhost:8000/img/${value.image}`}
                        alt=""
                      />
                    </div>
                    <div className="detail-box ">
                      <h5>{value.name}</h5>
                      <div className="social-box">
                        <Link to="">
                          <i className="fa fa-facebook" aria-hidden="true">
                            <BiLogoFacebook />
                          </i>
                        </Link>
                        <Link to="">
                          <i className="fa fa-twitter" aria-hidden="true">
                            <BsTwitter />
                          </i>
                        </Link>
                        <Link to="">
                          <i className="fa fa-linkedin" aria-hidden="true">
                            <BiLogoLinkedin />
                          </i>
                        </Link>
                        <Link to="">
                          <i className="fa fa-instagram" aria-hidden="true">
                            <AiFillInstagram />
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
