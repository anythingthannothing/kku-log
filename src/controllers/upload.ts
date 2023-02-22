import { generateUploadURL } from './utils/s3-upload';

const getImgUploadURL = async (req, res, next) => {
  const uploadURL = await generateUploadURL();
  res.status(200).json(uploadURL);
};

export { getImgUploadURL };
