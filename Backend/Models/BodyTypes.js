const mongoose = require("mongoose");

const BodyTypesSchema = mongoose.Schema({
   bodyType: { type: String, required: true },
});

module.exports = mongoose.model("BodyTypes", BodyTypesSchema);
