import React from "react";
import BannerVideo from "assets/video/pexelVideo.mp4";

import About from "./sections/About";
import Schedule from "./sections/Schedule";
import Interested from "./sections/Interested";
import Banner from "../../../components/Banner";

const Home = () => {
  return (
    <>
      <Banner pageTitle="home" />
      <About />
      <Interested />
    </>
  );
};

export default Home;
