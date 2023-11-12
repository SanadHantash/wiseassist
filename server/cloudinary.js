const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dfydwhh6h', 
  api_key: '872222993714285', 
  api_secret: 'ucrQrPUId2kIVq0s7Ui9l4gsWGo' 
});

module.exports = cloudinary.config;
