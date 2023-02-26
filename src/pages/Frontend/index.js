import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "./Home";
import ForOFor from "./FOF";
import Events from "./Events";
const index = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/events/*" element={<Events />} />
        <Route path="*" element={<ForOFor />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default index;
