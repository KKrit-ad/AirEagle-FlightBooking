import React from "react";
import Flight from "../components/Flight/Flight";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const FlightPage = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div>
        <Flight></Flight>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FlightPage;
