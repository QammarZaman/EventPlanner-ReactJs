import React from "react";
import EdwardImage from "assets/images/edward-unsplash-blur.jpg";
import Image1 from "assets/images/nainoa-shizuru-unsplash-blur.jpg";
import { Link } from "react-router-dom";

const index = ({ errorTitle, pageTitle }) => {
  let pageText = pageTitle || "Plan/Join Events";
  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${Image1})` }}
      >
        <div className="section-overlay"></div>

        <div className="container d-flex justify-content-center align-items-center">
          <div className="row align-items-center">
            <div className="col-12 text-center">
              {errorTitle ? (
                <></>
              ) : (
                <>
                  <small>Event Planner Application</small>
                </>
              )}

              <h1 className="text-white mb-5">
                {errorTitle
                  ? errorTitle
                  : pageText == "home"
                  ? "Plan/Join Events"
                  : pageText}
              </h1>

              {pageText == "home" ? (
                <>
                  <Link className="btn custom-btn smoothscroll" to="/events">
                    See Events
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="video-wrap">
          <img src={EdwardImage} alt="" srcset="" />
        </div>
      </section>
    </>
  );
};

export default index;
