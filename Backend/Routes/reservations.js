/** @format */

const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const Reservation = require('../Models/Reservations');

router.get('/', async (req, res) => {
	let filters = {};

	if (parseInt(req.query.roleId) === 2) {
		filters = { ...filters, ownerId: req.query.ownerId };
	}
	if (parseInt(req.query.roleId) === 1) {
		filters = { ...filters, userId: req.query.userId };
	}

	try {
		reservations = await Reservation.where(filters);
		res.json(reservations);
	} catch (error) {
		res.json({ message: err.message });
	}
});

router.post('/', verify, async (req, res) => {
	const reservation = new Reservation({
		dateFrom: req.body.dateFrom,
		dateTo: req.body.dateTo,
		reservationStatus: req.body.reservationStatus,
		userId: req.body.userId,
		carId: req.body.carId,
		userName: req.body.userName,
		ownerId: req.body.ownerId,
		ownerName: req.body.ownerName,
		carBrand: req.body.carBrand,
		carModel: req.body.carModel,
		price: req.body.price,
	});

	try {
		const validationOne = await Reservation.findOne({
			dateFrom: {
				$gte: req.body.dateFrom,
				$lte: req.body.dateTo,
			},
		});

		const validationTwo = await Reservation.findOne({
			dateTo: {
				$gte: req.body.dateFrom,
				$lte: req.body.dateTo,
			},
		});
		if (validationOne || validationTwo) {
			res.json({ error: 'Rezervacija je zauzeta' });
		} else {
			const savedReservation = await reservation.save();
			res.json({ savedReservation });
		}
	} catch (err) {
		res.json({ message: err.message });
	}
});

router.patch('/:id', verify, async (req, res) => {
	try {
		const updatedReservation = await Reservation.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					reservationStatus: req.body.reservationStatus,
				},
			},
		);
		res.json(updatedReservation);
	} catch (err) {
		res.json({ message: err });
	}
});
module.exports = router;
