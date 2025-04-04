require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB, sequelize } = require("./config/db");
const authRoutes= require('./routes/userRoutes')
const app = express();




app.use(
  cors(
    {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
)
);
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Task Management System API is running...");
});

app.use('/auth',authRoutes);


connectDB();

sequelize.sync()
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Sync Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
