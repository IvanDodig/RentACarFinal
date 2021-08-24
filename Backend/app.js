const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

//Middlewares
app.use(cors());
app.use("/uploads", express.static("Uploads"));
app.use(bodyParser.json());

// import routes
const authRoute = require("./Routes/auth");
app.use("/auth", authRoute);

const carsRoute = require("./Routes/cars");
app.use("/cars", carsRoute);

const reservationsRoute = require("./Routes/reservations");
app.use("/reservations", reservationsRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
   console.log("connected to DB!");
});

// Listen port
app.listen(3500);
