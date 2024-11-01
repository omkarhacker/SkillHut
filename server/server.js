require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes=require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-route");


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Use body-parser middleware (if needed)
app.use(bodyParser.json());  // For parsing application/json

// OR, if you're using Express 4.16+ you can use:
app.use(express.json());  // This parses incoming JSON requests

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


//database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

//routes configuration
app.use("/auth", authRoutes);
app.use("/media",mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
