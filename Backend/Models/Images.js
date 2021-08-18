const mongoose = require("mongoose");

const ImagesSchema = mongoose.Schema({
   imageName: { type: String, required: true },
   carId: { type: String, required: true },
});

module.exports = mongoose.model("Images", ImagesSchema);
