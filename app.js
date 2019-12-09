//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

var isLoggedIn = false;
var name = '';

app.get('/sign-up', function (req, res) {
    res.sendFile(__dirname + '/sign-up.html');
});

app.post('/sign-up', function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var password = req.body.password;

    console.log(firstName, lastName, email, password);
});

app.get('/sign-in', function (req, res) {
    res.sendFile(__dirname + '/sign-in.html');
});

app.post('/sign-in', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    isLoggedIn = true;
    name = email.substring(0, email.lastIndexOf('@'));

    console.log(name, email, password, isLoggedIn);

    res.redirect('/index');
});

app.get('/index', function (req, res) {
    //res.sendFile(__dirname + '/index.html');

    res.render('index', {
        authPass: isLoggedIn,
        fName: name
    });
});

app.post('/inventory1', (req, res) => {
    res.sendFile(__dirname + '/inventory1.html');
});

app.get('/inventory1', (req, res) => {
    res.sendFile(__dirname + '/inventory1.html');
});

app.post('/inventory2', (req, res) => {
    res.sendFile(__dirname + '/inventory2.html');
});

app.get('/inventory2', (req, res) => {
    res.sendFile(__dirname + '/inventory2.html');
});

app.post('/inventory3', (req, res) => {
    res.sendFile(__dirname + '/inventory3.html');
});

app.get('/inventory3', (req, res) => {
    res.sendFile(__dirname + '/inventory3.html');
});

app.listen(3000, function () {
    console.log('Connected to server on port 3000.');
});