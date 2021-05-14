require('dotenv').config();
const express = require('express');
const handleEmail = express.Router();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const emailRegex = require('./middleware/emailRegex');
const { emailIntCheck } = require('./middleware/emailRegex');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { MY_EMAIL, ID_CLIENT, SECRET_CLIENT, REFRESH_TOKEN } = process.env;

const myOauth2Client = new OAuth2(
  ID_CLIENT,
  SECRET_CLIENT,
  'https://developers.google.com/oauthplayground'
);

myOauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const myAccessToken = myOauth2Client.getAccessToken();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: MY_EMAIL,
    clientId: ID_CLIENT,
    clientSecret: SECRET_CLIENT,
    refreshToken: REFRESH_TOKEN,
    accessToken: myAccessToken,
  },
});
handleEmail.post(
  '/',
  emailRegex(emailIntCheck, 'invalid email'),
  (req, res) => {
    const { email, subject, message } = req.body;
    const mailOptions = {
      from: email,
      to: MY_EMAIL,
      subject: subject ? subject : 'email from nodemailer',
      html: `<p>${message}<p>`,
    };

    transporter.sendMail(mailOptions, function (err, res) {
      if (err) {
        res.send({ message: err });
      } else {
        console.log('email sent', res);
      }
    });
    res.status(200).json({ message: 'email sent' });
  }
);

module.exports = { handleEmail };
