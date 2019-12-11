//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const usersSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'Please check your data entry, no first name specified']
	},
	last_name: {
		type: String,
		required: [true, 'Please check your data entry, no last name specified']
	},
	email: {
		type: String,
		required: [true, 'Please check your data entry, no email specified']
	},
	password: {
		type: String,
		required: [true, 'Please check your data entry, no password specified']
	},
	cart: []
});

const cartsSchema = new mongoose.Schema({
	car_name: {
		type: String
	},
	price: {
		type: Number
	}
});

const User = mongoose.model('User', usersSchema);

const Cart = mongoose.model('Cart', cartsSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(express.static('public'));

let isLoggedIn = false;
let name = '';
let userID = '';

app.get('/sign-up', function(req, res) {
	res.render('sign-up', { signUpMessage: '', messageColor: '' });
});

app.post('/sign-up', function(req, res) {
	let message = '';
	User.findOne(
		{
			email: req.body.email
		},
		(err, result) => {
			if (!err) {
				if (!result) {
					const newUser = new User({
						first_name: req.body.fName,
						last_name: req.body.lName,
						email: req.body.email,
						password: req.body.password
					});

					newUser.save();
					message = 'Sign up successful!';
					res.render('sign-up', {
						signUpMessage: message,
						messageColor: 'successful'
					});
				} else {
					console.log('User is already in the database');
					message = 'You are already signed-up.';
					res.render('sign-up', {
						signUpMessage: message,
						messageColor: 'unsuccessful'
					});
				}
			} else {
				console.log(err);
			}
		}
	);
});

app.get('/sign-in', function(req, res) {
	res.render('sign-in', { signInMessage: '', signInColor: '' });
});

app.post('/sign-in', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	let message = '';

	User.findOne({ email: req.body.email }, (err, result) => {
		if (!err) {
			if (!result) {
				message =
					'Email does not exist, please check your credentials and try again';
				res.render('sign-in', {
					signInMessage: message,
					signInColor: 'unsuccessful'
				});
			} else {
				if (result.password === req.body.password) {
					message = 'Sign-in successful!';
					res.render('sign-in', {
						signInMessage: message,
						signInColor: 'successful'
					});
					userID = result._id;
					isLoggedIn = true;
					name = email.substring(0, email.lastIndexOf('@'));
				} else {
					message = 'Incorrect password, please try again';
					res.render('sign-in', {
						signInMessage: message,
						signInColor: 'unsuccessful'
					});
				}
			}
		} else {
			console.log(err);
		}
	});
});

app.get('/index', function(req, res) {
	//res.sendFile(__dirname + '/index.html');

	res.render('index', {
		authPass: isLoggedIn,
		fName: name
	});
});

app.get('/sign-out', (req, res) => {
	isLoggedIn = false;
	userID = '';
	res.redirect('/index');
});

app.get('/inventory1', (req, res) => {
	res.render('inventory1');
});

app.post('/inventory1', (req, res) => {
	let carPrice = 59;

	const item = new Cart({
		car_name: req.body.carName,
		price: carPrice
	});

	User.findById(userID, (err, result) => {
		if (!err) {
			result.cart.push(item);
			result.save((err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Item successfully added to cart');
				}
			});
		} else {
			console.log(err);
		}
	});
});

app.get('/shopping-cart', (req, res) => {
	User.findById(userID, (err, result) => {
		if (!err) {
			res.render('cart', { shoppingCart: result.cart });
		}
	});
});

app.post('/redirect', (req, res) => {
	res.redirect('/inventory1');
});

app.listen(3000, function() {
	console.log('Connected to server on port 3000.');
});
