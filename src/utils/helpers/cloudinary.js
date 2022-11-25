// instalar cloudinary multer multer-storage-cloudinary

const cloudinary = require("cloudinary");

// Meter en .env los datos

const setUpCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
};

module.exports = { setUpCloudinary };
