const mongoose = require("mongoose");

const BrandModelsSchema = mongoose.Schema({
   modelName: { type: String, required: true },
   brandId: { type: String, required: true },
});

module.exports = mongoose.model("BrandModels", BrandModelsSchema);
