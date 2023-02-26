import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import { useAuthContext } from "context/AuthContext";

const Index = () => {
  const { authentication } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={!authentication ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="/*" element={<Frontend />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
