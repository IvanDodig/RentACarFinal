/** @format */

const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const BrandModel = require('../Models/BrandModels');

// Get All models
router.get('/', async (req, res) => {
	let filters = {};
	if (req.query.brandId) {
		filters = { ...filters, brandId: req.query.brandId };
	}
	try {
		const models = await BrandModel.where(filters);
		res.json(models);
	} catch (error) {
		res.json({ message: err.message });
	}
});

// Get specific models
router.get('/:id', async (req, res) => {
	try {
		const model = await BrandModel.findById(req.params.modelId);
		res.json(model);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create a new model
router.post('/', verify, async (req, res) => {
	const model = new BrandModel({
		modelName: req.body.modelName,
		brandId: req.body.brandId,
	});
	console.log(model);
	try {
		const savedModel = await model.save();
		res.json({ savedModel });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the model
router.patch('/:id', verify, async (req, res) => {
	try {
		const updatedModel = await BrandModel.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					modelName: req.body.modelName,
					brandId: req.body.brandId,
				},
			},
		);

		res.json(updatedModel);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete model
router.delete('/:id', verify, async (req, res) => {
	try {
		const removedModel = await BrandModel.remove({ _id: req.params.id });
		res.json(removedModel);
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
