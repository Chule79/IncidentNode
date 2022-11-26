// instalar cloudinary multer multer-storage-cloudinary

const cloudinary = require("cloudinary");

// Meter en .env los datos

const setUpCloudinary = () => {
  cloudinary.config({
    cloud_name: 'dcssmtpvq',
    api_key: '484369842275712',
    api_secret: 'hBjhmQwPyRylmmFzvsbVjMGAHZw',
  });
};

module.exports = { setUpCloudinary };
