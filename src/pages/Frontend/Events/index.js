import { useAuthContext } from "context/AuthContext";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ForOFor from "../FOF/ForOFor";
import AddEvent from "./AddEvents";
import AllEvent from "./AllEvents";
import MyEvents from "./MyEvents";

const Index = () => {
  const { authentication } = useAuthContext();
  return (
    <Routes>
      <Route index element={<AllEvent />} />
      <Route
        path="/my-events"
        element={authentication ? <MyEvents /> : <Navigate to="/" />}
      />
      <Route
        path="/add-event/"
        element={authentication ? <AddEvent /> : <Navigate to="/" />}
      />
      <Route path="*" element={<ForOFor />} />
    </Routes>
  );
};

export default Index;
