import React from "react";
import { Link, Outlet } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { BiLogoLinkedin } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
function GetInTouch() {
  return (
    <>
      <Outlet />
      <section className="contact_section ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 map_container">
              <div className="map">
                <div id="googleMap">
                  <iframe
                    title=""
                    id="googleMap"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4384347703726!2d76.68200117445404!3d30.706072586922627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fefe86537c193%3A0xc0cea068f1cdf7ac!2sInvoxico%20Technologies!5e0!3m2!1sen!2sin!4v1690869577733!5m2!1sen!2sin"
                    width="900"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-md-4 detail-box detail_box_common">
              <div>
                <div className="heading_container">
                  <h2>Get In Touch</h2>
                </div>
                <div className="info_contact">
                  <div className="contact_link_box">
                    <Link to="https://goo.gl/maps/WyMfUqN3Q37ty3EL8">
                      <i className="fa fa-map-marker" aria-hidden="true">
                        <HiLocationMarker />
                      </i>
                      <span>Location</span>
                    </Link>
                    <Link>
                      <i className="fa fa-phone" aria-hidden="true">
                        <MdCall />
                      </i>
                      <span>Call +01 1234567890</span>
                    </Link>
                    <Link>
                      <i className="fa fa-envelope" aria-hidden="true">
                        <HiMail />
                      </i>
                      <span>demo@gmail.com</span>
                    </Link>
                  </div>
                  <div className="info_social">
                    <Link>
                      <i className="fa fa-facebook" aria-hidden="true">
                        <BiLogoFacebook />
                      </i>
                    </Link>
                    <Link>
                      <i className="fa fa-twitter" aria-hidden="true">
                        <BsTwitter />
                      </i>
                    </Link>
                    <Link>
                      <i className="fa fa-linkedin" aria-hidden="true">
                        <BiLogoLinkedin />
                      </i>
                    </Link>
                    <Link>
                      <i className="fa fa-instagram" aria-hidden="true">
                        <AiFillInstagram />
                      </i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GetInTouch;
