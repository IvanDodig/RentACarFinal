const mongoose = require("mongoose");

const CarsSchema = mongoose.Schema({
   brandId: { type: String, required: true },
   brandName: { type: String, required: true },
   modelId: { type: String, required: true },
   modelName: { type: String, required: true },
   fuelTypeId: { type: String, required: true },
   fuelTypeName: { type: String, required: true },
   bodyTypeId: { type: String, required: true },
   bodyTypeName: { type: String, required: true },
   seatsNum: { type: Number, min: 2, max: 7, required: true },
   doorsNum: { type: Number, min: 2, max: 7, required: true },
   priceDay: { type: Number, required: true },
   images: { type: String, required: true },
   enginePower: { type: Number, required: true },
   engineCapacity: { type: Number, required: true },
   userId: { type: String, required: true },
   userName: { type: String, required: true },
});

module.exports = mongoose.model("Cars", CarsSchema);
