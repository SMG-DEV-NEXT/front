import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'dqdiocjpu',
  api_key: '811851328664681',
  api_secret: 'XrmvEVdcUhK7WiEiXSMN1ZUGgsA',
  secure: true, // Ensures HTTPS connection
});

export default cloudinary;
