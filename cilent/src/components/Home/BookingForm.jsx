import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingForm.css";

const BookingForm = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [classType, setClassType] = useState("Economy");
  const [userEmail, setUserEmail] = useState("");
  const [isEmailFormVisible, setEmailFormVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryOptions = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();

    // Set current date for min date in journeyDate input
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setCurrentDate(today);
  }, []);

  const handleBook = (event) => {
    event.preventDefault();
    setEmailFormVisible(true);
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/book", {
        fromCountry,
        toCountry,
        journeyDate,
        guests,
        classType,
        userEmail,
      });
      alert("Booking confirmed and email sent");
      // Reset form or handle successful booking
    } catch (error) {
      console.error("Error during booking:", error);
      alert("Error during booking. Please try again.");
    }
  };

  return (
    <div className="booking-form1">
      <form onSubmit={handleBook} className="form">
        <div className="form-group">
          <label htmlFor="fromCountry">From Country</label>
          <select
            id="fromCountry"
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="toCountry">To Country</label>
          <select
            id="toCountry"
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="journeyDate">Journey Date</label>
          <input
            type="date"
            id="journeyDate"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
            min={currentDate} // Set minimum date as today
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            id="guests"
            value={guests}
            min="1"
            max="5"
            onChange={(e) => setGuests(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="classType">Class</label>
          <select
            id="classType"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            required
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
        <button type="submit" className="book-button">
          Book
        </button>
      </form>

      {/* Email Form */}
      {isEmailFormVisible && (
        <div className="email-form">
          <form onSubmit={handleEmailSubmit} className="form">
            <div className="form-group">
              <label htmlFor="userEmail">Your Email</label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
