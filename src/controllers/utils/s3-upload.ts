import s3 from '../../aws-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const generateUploadURL = async () => {
  const params = {
    Bucket: 'kkulog',
    Key: `thumbnails/${Date.now()}`,
    ACL: 'public-read',
  };
  const command = new PutObjectCommand(params);

  const signedURL = await getSignedUrl(s3, command, { expiresIn: 300 });
  return signedURL;
};

export { generateUploadURL };
