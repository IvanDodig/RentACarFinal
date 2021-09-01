/** @format */

const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Comment = require('../Models/Comments');

// Get All comments
router.get('/', async (req, res) => {
	try {
		const comments = await Comment.find();
		res.json(comments);
	} catch (error) {
		res.json({ message: err.message });
	}
});

// Get specific comment
router.get('/:id', async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		res.json(comment);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create a new comment
router.post('/', verify, async (req, res) => {
	const comment = new comment({
		text: req.body.text,
		userName: req.body.userName,
		userId: req.body.userId,
		carId: req.body.carId,
	});
	try {
		const savedComment = await comment.save();
		res.json({ savedComment });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the brand
router.patch('/:id', verify, async (req, res) => {
	try {
		const updatedComment = await Comment.updateOne(
			{ _id: req.params },
			{
				$set: {
					text: req.body.text,
					userName: req.body.userName,
					userId: req.body.userId,
					carId: req.body.carId,
				},
			},
		);

		res.json(updatedComment);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete comment
router.delete('/:id', verify, async (req, res) => {
	try {
		const removedComment = await Comment.remove({ _id: req.params.id });
		res.json(removedComment);
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
