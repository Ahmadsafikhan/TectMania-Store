import React from "react";
import Header from "./components/Header";
// import HomeScreen from "./screens/HomeScreen";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
