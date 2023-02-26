import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {" "}
      <footer class="site-footer">
        <div class="site-footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-12">
                <h2 class="text-white mb-lg-0">Event Planner</h2>
              </div>

              <div class="col-lg-6 col-12 d-flex justify-content-lg-end align-items-center">
                <ul class="social-icon d-flex justify-content-lg-end">
                  <li class="social-icon-item">
                    <a href="#" class="social-icon-link">
                      <span class="bi-twitter"></span>
                    </a>
                  </li>

                  <li class="social-icon-item">
                    <a href="#" class="social-icon-link">
                      <span class="bi-apple"></span>
                    </a>
                  </li>

                  <li class="social-icon-item">
                    <a href="#" class="social-icon-link">
                      <span class="bi-instagram"></span>
                    </a>
                  </li>

                  <li class="social-icon-item">
                    <a href="#" class="social-icon-link">
                      <span class="bi-youtube"></span>
                    </a>
                  </li>

                  <li class="social-icon-item">
                    <a href="#" class="social-icon-link">
                      <span class="bi-pinterest"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-12 mb-4 pb-2">
              <h5 class="site-footer-title mb-3">Links</h5>

              <ul class="site-footer-links">
                <li class="site-footer-link-item">
                  <Link to="/" class="site-footer-link">
                    Home
                  </Link>
                </li>

                <li class="site-footer-link-item">
                  <Link to="/events" class="site-footer-link">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
              <h5 class="site-footer-title mb-3">Have a question?</h5>

              <p class="text-white d-flex mb-1">
                <a href="tel: +92 316 7434993" class="site-footer-link">
                  +92 316 7434993
                </a>
              </p>

              <p class="text-white d-flex">
                <a
                  href="mailto:qammarzaman30@gmail.com"
                  class="site-footer-link"
                >
                  qammarzaman30@gmail.com
                </a>
              </p>
            </div>

            <div class="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
              <h5 class="site-footer-title mb-3">Location</h5>

              <p class="text-white d-flex mt-3 mb-2">
                Jaranwala Road, Faisalabad
              </p>
            </div>
          </div>
        </div>

        <div class="site-footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-12 mt-5">
                <p class="copyright-text">Copyright © 2023 Event Planner</p>
                <p class="copyright-text">
                  Distributed by:{" "}
                  <Link to="https://qammarzaman.com">Qammar Zaman</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
