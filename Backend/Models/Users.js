const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
   firstName: {
      type: String,
      min: 3,
      max: 255,
      required: true,
   },
   lastName: {
      type: String,
      min: 3,
      max: 255,
      required: true,
   },
   email: {
      type: String,
      min: 8,
      max: 255,
      required: true,
   },
   password: {
      type: String,
      min: 6,
      max: 1024,
      required: true,
   },
   birthDate: {
      type: Date,
      required: true,
   },
   roleId: {
      type: String,
      min: 1,
      max: 2,
      required: true,
   },
});

module.exports = mongoose.model("User", UserSchema);
