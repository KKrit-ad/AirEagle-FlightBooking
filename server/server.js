require("dotenv").config(); // เพิ่มบรรทัดนี้เพื่อโหลด .env
const express = require("express");
const bodyParser = require("body-parser");

const flightRoutes = require("./routes/flight");
const bookRoutes = require("./routes/bookRoutes"); // เพิ่มเส้นทางสำหรับ bookRoutes

const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000; // ใช้ค่าจาก .env

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "aireagle-flightbooking.vercel.app"], // เพิ่ม Vercel URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // ถ้าคุณต้องการอนุญาต cookies
  })
);
app.use(bodyParser.json());

app.use("/api", bookRoutes);
app.use("/api/flight", flightRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
