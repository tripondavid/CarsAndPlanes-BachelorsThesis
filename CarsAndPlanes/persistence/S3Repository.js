import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export const uploadMediaFile = async (
  bucketName,
  filePath,
  key,
  contentType
) => {
  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: contentType,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("File uploaded successfully:", data);

    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
