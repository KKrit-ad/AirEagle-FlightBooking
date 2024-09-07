require("dotenv").config(); 
const express = require("express");
const bodyParser = require("body-parser");

const flightRoutes = require("./routes/flight");
const bookRoutes = require("./routes/bookRoutes"); 

const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000; 

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://aireagle-flightbooking.vercel.app",
    ], 
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  })
);

app.use(bodyParser.json());

app.use("/api", bookRoutes);
app.use("/api/flight", flightRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
