import React from "react";
import Banner from "./Banner";

import MainInfo from "./MainInfo";
import BookingForm from "./BookingForm";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <BookingForm></BookingForm>
      <MainInfo></MainInfo>
      <Footer></Footer>
    </div>
  );
};

export default Home;
