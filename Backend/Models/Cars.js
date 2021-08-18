const mongoose = require("mongoose");

const CarsSchema = mongoose.Schema({
   seatsNum: { type: Number, min: 2, max: 7, required: true },
   priceDay: { type: Number, required: true },
   fuelType: { type: String, required: true },
   images: { type: String, required: true },
   userId: { type: String, required: true },
});

module.exports = mongoose.model("Cars", CarsSchema);
