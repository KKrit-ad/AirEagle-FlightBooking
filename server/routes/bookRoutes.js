const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.HOTMAIL_USER, 
    pass: process.env.HOTMAIL_PASS, 
  },
});

router.post("/book", (req, res) => {
  const { fromCountry, toCountry, journeyDate, guests, classType, userEmail } =
    req.body;

  const mailOptions = {
    from: process.env.HOTMAIL_USER,
    to: userEmail,
    subject: "Booking Confirmation",
    html: `
      <p>Thank you for booking with us! We will search for the flight you are looking for and send it back to you.</p>
      
      <h3>Details:</h3>
      <ul>
        <li><strong>From:</strong> ${fromCountry}</li>
        <li><strong>To:</strong> ${toCountry}</li>
        <li><strong>Journey Date:</strong> ${journeyDate}</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Class:</strong> ${classType}</li>
      </ul>

      <p>We look forward to serving you.</p>
      <p>AirEAGLE Company</p>

      <img src="cid:booklogo@aireagle.com" alt="AirEAGLE Logo" />
    `,
    attachments: [
      {
        filename: "book-logo.png", 
        path: "logo.png", 
        cid: "booklogo@aireagle.com", 
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Booking confirmed and email sent");
  });
});

router.post("/book/flight", (req, res) => {
  const { flight, bookingDetails } = req.body;

  const mailOptions = {
    from: process.env.HOTMAIL_USER,
    to: bookingDetails.email,
    subject: `Booking Confirmation for Flight ${flight.flightNumber}`,
    html: `
      <p>Dear ${bookingDetails.name} ${bookingDetails.surname},</p>

      <p>Your booking for Flight Number ${flight.flightNumber} has been confirmed.</p>

      <h3>Flight Details:</h3>
      <ul>
        <li><strong>Departure:</strong> ${flight.departure.city}, ${flight.departure.country} on ${flight.departure.date} at ${flight.departure.time}</li>
        <li><strong>Arrival:</strong> ${flight.arrival.city}, ${flight.arrival.country} on ${flight.arrival.date} at ${flight.arrival.time}</li>
        <li><strong>Duration:</strong> ${flight.duration} hours</li>
        <li><strong>Airline:</strong> ${flight.airline}</li>
        <li><strong>Class:</strong> ${flight.classType}</li>
        <li><strong>Price:</strong> $${flight.price}</li>
        <li><strong>Number of People:</strong> ${bookingDetails.numberOfPeople}</li>
      </ul>

      <p>Thank you for booking with us.</p>

      <p>Best regards,<br>Your Flight Booking Team<br>AirEAGLE Company</p>

      <img src="cid:flightlogo@aireagle.com" alt="AirEAGLE Logo" />
    `,
    attachments: [
      {
        filename: "flight-logo.png", 
        path: "logo.png", 
        cid: "flightlogo@aireagle.com", 
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Booking confirmed and email sent");
  });
});

module.exports = router;
