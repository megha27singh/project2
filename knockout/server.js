
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const dbSession = require('./lib/dbConnection');
const services = require('./lib/services');

const port = 9002;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dbobject = dbSession.getDBSession(); // Initialize Db Connection...

setTimeout(function () {
    services.createTable();
}, 3000);

app.route('/').get(function (req, res) {
    console.log('Get Home - starts');
    res.status(200).send("Welcome to User Application");
    console.log('Get Home - ends');
});

app.route('/getusers').get(function (req, res) {
    console.log('Get Users - starts');
    services.getUsers().then(users => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(500).send(err.message);
    });
    console.log('Get Users - ends');
});

app.route('/saveuser').post(function (req, res) {
    console.log('Post User - starts', req.body);
    services.saveUser(req.body).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err.message);
    });
    console.log('Post User - ends');
});

app.use(express.static(__dirname));
app.listen(port, function () {
    console.log('Server is running now. Address http://localhost:%s', port);
});

