import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ForOFor from "pages/Frontend/FOF";
import Header from "components/Header";
import Footer from "components/Footer";

const index = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ForOFor errorTitle="404 No Page Found" />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default index;
