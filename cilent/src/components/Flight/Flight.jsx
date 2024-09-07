import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Flight.css";

const Flight = () => {
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    surname: "",
    email: "",
    numberOfPeople: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flight");
        setFlightData(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  const handleBookClick = (flight) => {
    setSelectedFlight(flight);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({ ...bookingForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/book/flight", {
        flight: selectedFlight,
        bookingDetails: bookingForm,
      });
      alert("Booking confirmed! A confirmation email has been sent.");
      setShowForm(false);
      setBookingForm({
        name: "",
        surname: "",
        email: "",
        numberOfPeople: "",
      });
    } catch (error) {
      console.error("Error booking flight:", error);
      alert("Failed to book the flight.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="flight-info">
      <h1>Flight Details</h1>
      <div className="flight-details">
        {flightData.map((flight, index) => (
          <div key={index} className="flight-detail-item">
            <h2>Flight Number: {flight.flightNumber}</h2>
            <p>
              <strong>Departure:</strong>
            </p>
            <p>
              {flight.departure.city}, {flight.departure.country}
            </p>
            <p>
              {flight.departure.date} at {flight.departure.time}
            </p>
            <p>
              <strong>Departure Airport:</strong> {flight.departure.airport}
            </p>
            <p>
              <strong>Arrival:</strong>
            </p>
            <p>
              {flight.arrival.city}, {flight.arrival.country}
            </p>
            <p>
              {flight.arrival.date} at {flight.arrival.time}
            </p>
            <p>
              <strong>Arrival Airport:</strong> {flight.arrival.airport}
            </p>
            <p>
              <strong>Duration:</strong> {flight.duration} hours
            </p>
            <p>
              <strong>Airline:</strong> {flight.airline}
            </p>
            <p>
              <strong>Class:</strong> {flight.classType}
            </p>
            <p>
              <strong>Price:</strong> ${flight.price}
            </p>
            <p>
              <strong>Status:</strong> {flight.status}
            </p>
            <button
              className="book-button"
              onClick={() => handleBookClick(flight)}
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="booking-form">
          <button className="close-button" onClick={handleCloseForm}>
            X
          </button>
          <h2>Book Flight</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={bookingForm.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Surname:
              <input
                type="text"
                name="surname"
                value={bookingForm.surname}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={bookingForm.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Number of People:
              <input
                type="number"
                name="numberOfPeople"
                value={bookingForm.numberOfPeople}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Flight;
