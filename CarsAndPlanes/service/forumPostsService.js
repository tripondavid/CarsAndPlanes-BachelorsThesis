import {
  getPosts as requestGetPosts,
  getUserPosts as requestGetUserPosts,
  addPost as requestAddPost,
  getPostsBySearch as requestGetPostsBySearch,
} from "../persistence/dynamoDBRepository.js";
import ForumPost from "../model/posts/ForumPost.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { v4 as uuidv4 } from "uuid";

const bucketName = process.env.BUCKET_NAME;
const s3Client = new S3Client({
  region: "eu-west-1",
});

export const generatePresignedUrl = async (fileName, fileType) => {
  const finalFileName = uuidv4() + fileName;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: finalFileName,
    ContentType: fileType,
  });

  try {
    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // URL valid for 60 seconds
    return { uploadURL, finalFileName };
  } catch (err) {
    throw new Error(`Error generating pre-signed URL: ${err.message}`);
  }
};

export const getPosts = async (lastEvaluatedKey, limit) => {
  return requestGetPosts(lastEvaluatedKey, limit);
};
export const getPostsBySearch = async (content, lastEvaluatedKey, limit) => {
  return requestGetPostsBySearch(content, lastEvaluatedKey, limit);
};

export const getUserPosts = async (username, lastEvaluatedKey, limit) => {
  return requestGetUserPosts(username, lastEvaluatedKey, limit);
};

export const addPost = async (content, mediaFileURL, username) => {
  if (!content) {
    throw new Error("Invalid description");
  }

  const forumPostID = uuidv4();
  const createdAt = Date.now();
  const post = new ForumPost(
    forumPostID,
    username,
    createdAt,
    content,
    mediaFileURL
  );

  return requestAddPost(post);
};
