import S3 from 'react-s3';

export const upload = async (file) => {
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  };

  const data = await S3.uploadFile(file, config);

  return data.location;
};
