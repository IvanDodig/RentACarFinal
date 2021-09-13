/** @format */

const mongoose = require('mongoose');

const ReservationsSchema = mongoose.Schema({
	dateFrom: { type: String, required: true },
	dateTo: { type: String, required: true },
	reservationStatus: { type: String, required: true },
	userId: { type: String, required: true },
	userName: { type: String, required: true },
	ownerId: { type: String, required: true },
	ownerName: { type: String, required: true },
	carId: { type: String, required: true },
	carBrand: { type: String, required: true },
	carModel: { type: String, required: true },
	price: { type: String, required: true },
});

module.exports = mongoose.model('Reservations', ReservationsSchema);
