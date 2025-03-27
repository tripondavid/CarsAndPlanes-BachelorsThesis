import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "eu-west-1",
});

const createS3Bucket = async (bucketName) => {
  const params = {
    Bucket: bucketName,
    CreateBucketConfiguration: {
      LocationConstraint: "eu-west-1",
    },
  };

  try {
    const data = await s3Client.send(new CreateBucketCommand(params));
    console.log("Bucket created successfully:", data.Location);
  } catch (error) {
    console.error("Error creating bucket:", error);
  }
};

createS3Bucket("cars-and-planes-bucket");
