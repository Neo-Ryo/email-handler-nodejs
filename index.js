require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { handleEmail } = require('./mail.route');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const hostname = 'localhost';
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/email', handleEmail);

app.get('/', (req, res) => {
  res.status(200).json('Welcome!!!');
});

app.listen(PORT, hostname, () => {
  console.log(`server runnin at ${hostname}:${PORT}`);
});

module.exports = app;
