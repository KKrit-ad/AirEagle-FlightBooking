import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// สมมุติว่ามี FlightPage component // สมมุติว่ามี ContactPage component

import HomePage from "./pages/HomePage";
import FlightPage from "./pages/FlightPage";
import ContactPage from "./pages/ContactPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<FlightPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
