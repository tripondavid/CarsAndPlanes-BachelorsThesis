import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const getPosts = async (lastEvaluatedKey = null, limit = 10) => {
  const params = {
    TableName: "PostsTable",
    IndexName: "POSTTYPE_CREATED_AT_GSI",
    Limit: limit,
    ScanIndexForward: false,
    KeyConditionExpression: "PostType = :postType", // Required
    ExpressionAttributeValues: {
      ":postType": "ForumPost", // Replace with the actual post type value
    },
  };
  if (typeof lastEvaluatedKey === "string") {
    lastEvaluatedKey = JSON.parse(lastEvaluatedKey);
  }
  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = lastEvaluatedKey;
    console.log(lastEvaluatedKey);
  }
  const command = new QueryCommand(params);
  const result = await docClient.send(command);
  console.log(result);
  const { Items, LastEvaluatedKey } = result;

  return { Items, LastEvaluatedKey };
};

export const getPostsBySearch = async (
  content,
  lastEvaluatedKey = null,
  limit = 10
) => {
  const params = {
    TableName: "PostsTable",
    FilterExpression: "contains(content, :search)",
    ExpressionAttributeValues: {
      ":search": content,
    },
    Limit: limit,
  };
  if (typeof lastEvaluatedKey === "string") {
    lastEvaluatedKey = JSON.parse(lastEvaluatedKey);
  }
  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = lastEvaluatedKey;
    console.log(lastEvaluatedKey);
  }

  const command = new ScanCommand(params);
  const result = await docClient.send(command);
  const { Items, LastEvaluatedKey } = result;

  return { Items, LastEvaluatedKey };
};

export const getUserPosts = async (
  username,
  lastEvaluatedKey = null,
  limit = 10
) => {
  const params = {
    TableName: "PostsTable",
    IndexName: "USERNAME_CREATED_AT_GSI",
    Limit: limit,
    ScanIndexForward: false,
    LastEvaluatedKey: lastEvaluatedKey,
    KeyConditionExpression: "Username = :username", // Required
    ExpressionAttributeValues: {
      ":username": username, // Replace with the actual post type value
    },
  };
  if (typeof lastEvaluatedKey === "string") {
    lastEvaluatedKey = JSON.parse(lastEvaluatedKey);
  }
  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = lastEvaluatedKey;
  }
  const command = new QueryCommand(params);
  const result = await docClient.send(command);
  const { Items, LastEvaluatedKey } = result;

  return { Items, LastEvaluatedKey };
};

export const addPost = async (post) => {
  const params = {
    TableName: "PostsTable",
    Item: {
      PostType: post.postType,
      ForumPostID: post.forumPostID,
      Username: post.username,
      CreatedAt: post.createdAt, //TODO: check why it converts to String between Service and Repo
      Content: post.content,
      ...(post.mediaFileURL != null && { MediaFileURL: post.mediaFileURL }),
    },
  };
  const command = new PutCommand(params);
  const result = await docClient.send(command);

  return result;
};

export const deletePost = async (postID) => {
  const params = {
    TableName: "PostsTable",
    Key: {
      ForumPostID: postID, // Assuming 'ForumPostID' is the primary key
    },
  };

  // Create the DeleteCommand
  const command = new DeleteCommand(params);

  try {
    // Send the command to DynamoDB
    const result = await docClient.send(command);
    console.log("Post successfully deleted:", result);
    return result; // Return the response for confirmation
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error; // Rethrow the error for higher-level handling
  }
};

export const getCommentsForPost = async (
  forumPostID,
  lastEvaluatedKey = null,
  limit = 10
) => {
  console.log("forumPostID: ", forumPostID);
  console.log("type: ", typeof forumPostID);
  const params = {
    TableName: "CommentsTable",
    IndexName: "FORUMPOSTID_CREATED_AT_GSI",
    Limit: limit,
    LastEvaluatedKey: lastEvaluatedKey,
    ScanIndexForward: false,
    KeyConditionExpression: "ForumPostID = :postId",
    ExpressionAttributeValues: {
      ":postId": forumPostID.replace(/^"|"$/g, ""), //TODO: fix the bug
    },
  };
  if (typeof lastEvaluatedKey === "string") {
    lastEvaluatedKey = JSON.parse(lastEvaluatedKey);
  }
  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = lastEvaluatedKey;
  }
  console.log(lastEvaluatedKey);
  const command = new QueryCommand(params);
  const result = await docClient.send(command);
  console.log(result);
  const { Items, LastEvaluatedKey } = result;

  return { Items, LastEvaluatedKey };
};

export const addComment = async (comment) => {
  const params = {
    TableName: "CommentsTable",
    Item: {
      CommentID: comment.commentID,
      Username: comment.username,
      ForumPostID: comment.postID,
      CreatedAt: comment.createdAt,
      Content: comment.content,
    },
  };

  const command = new PutCommand(params);
  const result = await docClient.send(command);
  console.log(result);
  return result;
};

export const deleteComment = async (commentID) => {
  const params = {
    TableName: "CommentsTable",
    Key: {
      CommentID: commentID, // Assuming 'CommentID' is the primary key in the table
    },
  };

  // Create the DeleteCommand
  const command = new DeleteCommand(params);

  try {
    // Send the command to DynamoDB
    const result = await docClient.send(command);
    console.log("Comment successfully deleted:", result);
    return result; // Return the response for confirmation
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error; // Rethrow the error for higher-level handling
  }
};
