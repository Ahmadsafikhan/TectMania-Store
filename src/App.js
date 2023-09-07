import React from "react";
import Header from "./components/Header";
// import HomeScreen from "./screens/HomeScreen";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <div>
        <ToastContainer />
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
