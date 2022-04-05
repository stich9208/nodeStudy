import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const endpoint = new AWS.Endpoint(process.env.END_POINT);
const region = process.env.REGION;
const bucket_name = process.env.BUCKET_NAME;
const access_key = process.env.NCLOUD_ACCESS_KEY;
const secret_key = process.env.NCLOUD_SECRET_KEY;

export const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});

//functions
export const addFolderToStorage = async (folderPath) => {
  await S3.putObject({
    Bucket: bucket_name,
    Key: folderPath,
  }).promise();
};

export const getFolderList = async () => {
  let folderList = [];

  const params = {
    Bucket: bucket_name,
  };

  params.Delimiter = "/";
  while (true) {
    let response = await S3.listObjectsV2(params).promise();
    for (let folder of response.CommonPrefixes) {
      folderList.push(folder.Prefix);
    }
    if (response.IsTruncated) {
      params.Marker = response.NextMarker;
    } else {
      break;
    }
  }
  return folderList;
};

export const uploadVideoToStorage = async (file, fileName) => {
  let videoName = `video/${fileName}`;
  await S3.putObject({
    Bucket: bucket_name,
    Key: videoName,
    ACL: "public-read",
    Body: file,
  }).promise();
};
