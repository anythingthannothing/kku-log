import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kkulog',
    allowedFormats: ['png', 'jpeg', 'jpg'],
  },
});

export { cloudinary, storage };
