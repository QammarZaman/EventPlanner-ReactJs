import React from "react";
import Image1 from "assets/images/nainoa-shizuru-unsplash-blur.jpg";

const About = () => {
  return (
    <>
      <section className="about-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center">
              <div className="services-info">
                <h2 className="text-white mb-4">About Event Planner</h2>

                <p className="text-white">
                  Event Planner Application is a free application in which we
                  let's you add and join the various type of events at a single
                  door.
                </p>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="about-text-wrap">
                <img src={Image1} className="about-image img-fluid" />

                <div className="about-text-info d-flex">
                  <div className="d-flex">
                    <i className="about-text-icon bi-person"></i>
                  </div>

                  <div className="ms-4">
                    <h3>a happy moment</h3>

                    <p className="mb-0">
                      your amazing event planning experience with us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
