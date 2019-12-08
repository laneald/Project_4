const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

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

    console.log(email, password);
});

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('Connected to server on port 3000.');
});