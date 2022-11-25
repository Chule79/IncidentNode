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

app.set('userSecretKey', process.env.USER_SECRET_KEY_JWT);
app.set('adminSecretKey', process.env.ADMIN_SECRET_KEY_JWT);


require('../routes')(app);

module.exports = app;

