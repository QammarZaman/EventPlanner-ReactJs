import React from "react";
import Routes from "./pages/Routes";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import "jquery/dist/jquery";
// import "../src/assets/js/jquery.sticky";
import "../src/assets/js/click-scroll";
import "../src/assets/js/custom";
import "./global";
import { AuthContextProvider, useAuthContext } from "context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthContextProvider>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthContextProvider>
  );
}

export default App;
