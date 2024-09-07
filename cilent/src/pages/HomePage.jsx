import React from "react";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div>
        <Home></Home>
      </div>
    </div>
  );
};

export default HomePage;
