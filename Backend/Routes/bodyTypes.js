/** @format */

const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const BodyType = require('../Models/BodyTypes');

// Get All body types
router.get('/', async (req, res) => {
	try {
		const bodyTypes = await BodyType.find();
		res.json(bodyTypes);
	} catch (error) {
		res.json({ message: err.message });
	}
});

// Get specific body type
router.get('/:id', async (req, res) => {
	try {
		const bodyType = await BodyType.findById(req.params.bodyTypeId);
		res.json(bodyType);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create a new bodyType
router.post('/', verify, async (req, res) => {
	const bodyType = new BodyType({
		bodyType: req.body.bodyType,
	});
	try {
		const savedBodyType = await bodyType.save();
		res.json({ savedBodyType });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the bodyType
router.patch('/:id', verify, async (req, res) => {
	try {
		const updatedBodyType = await BodyType.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					bodyType: req.body.bodyType,
				},
			},
		);

		res.json(updatedBodyType);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete body type
router.delete('/:id', verify, async (req, res) => {
	try {
		const removedBodyType = await BodyType.remove({ _id: req.params.id });
		res.json(removedBodyType);
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
