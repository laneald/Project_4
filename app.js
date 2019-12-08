const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.get('/signin', function (req, res) {
    res.sendFile(__dirname + '/signin.html');
});

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('Connected to server on port 3000.');
});