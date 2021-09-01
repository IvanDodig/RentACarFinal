const mongoose = require("mongoose");

const ReservationsSchema = mongoose.Schema({
   dateFrom: { type: String, required: true },
   dateTo: { type: String, required: true },
   reservationStatus: { type: String, required: true },
   userId: { type: String, required: true },
   carId: { type: String, required: true },
});

module.exports = mongoose.model("Reservations", ReservationsSchema);
