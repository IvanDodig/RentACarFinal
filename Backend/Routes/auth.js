/** @format */

const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
	// data validation
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if user exists
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');

	// password hash
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hashPassword,
		birthDate: req.body.birthDate,
		roleId: req.body.roleId,
	});

	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// login
router.post('/login', async (req, res) => {
	// data validation
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if user exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Email nije registriran');

	// check if password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Lozinka nije ispravna');

	// Create and assign token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send({
		token,
		userId: user._id,
		roleId: user.roleId,
		user: user,
	});
});

module.exports = router;
