const express = require('express');
const cors = require('cors');
const compression = require('compression');

const dotenv = require('dotenv');
const { setUpCloudinary } = require('../utils/helpers/cloudinary');

dotenv.config();

setUpCloudinary();

const app = express();

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};
// Compress all HTTP responses
app.use(compression({
  // filter: Decide if the answer should be compressed or not,
  // depending on the 'shouldCompress' function above
  filter: shouldCompress,
  // threshold: It is the byte threshold for the response 
  // body size before considering compression, the default is 1 kB
  threshold: 0
}));

app.use(cors());

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.set('userSecretKey', 'n30l4nDuser');
app.set('adminSecretKey', 'n30l4nDadmin');

require('../routes')(app);

module.exports = app;
