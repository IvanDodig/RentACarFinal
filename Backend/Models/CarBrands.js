const mongoose = require("mongoose");

const CarBrandsSchema = mongoose.Schema({
   brandName: { type: String, required: true },
});

module.exports = mongoose.model("CarBrands", CarBrandsSchema);
