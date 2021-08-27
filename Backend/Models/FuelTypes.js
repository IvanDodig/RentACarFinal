const mongoose = require("mongoose");

const FuelTypesSchema = mongoose.Schema({
   fuelType: { type: String, required: true },
});

module.exports = mongoose.model("FuelTypes", FuelTypesSchema);
