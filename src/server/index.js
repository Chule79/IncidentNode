const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const { setUpCloudinary } = require('../utils/helpers/cloudinary');

dotenv.config();

setUpCloudinary();


const app = express();

app.use(cors());

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.set('secretKey', process.env.SECRET_KEY_JWT);

require('../routes')(app);

module.exports = app;

