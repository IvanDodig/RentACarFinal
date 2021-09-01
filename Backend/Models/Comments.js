/** @format */

const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
	text: { type: String, required: true },
	userName: { type: String, required: true },
	userId: { type: String, required: true },
	carId: { type: String, required: true },
});

module.exports = mongoose.model('Comments', CommentsSchema);
