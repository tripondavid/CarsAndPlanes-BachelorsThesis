import Comment from "../model/comments/Comment.js";
import {
  getCommentsForPost as requestGetCommentsForPost,
  addComment as requestAddComment,
  deleteComment as requestDeleteComment,
} from "../persistence/dynamoDBRepository.js";
import { v4 as uuidv4 } from "uuid";

export const addCommentToPost = async (postID, content, username) => {
  if (!postID || !content) {
    throw new Error("Invalid description");
  }

  const commentID = uuidv4();
  const createdAt = Date.now();
  const comment = new Comment(commentID, username, postID, createdAt, content);

  const result = await requestAddComment(comment);
  if (result.$metadata.httpStatusCode === 200) {
    return comment;
  } else {
    throw new Error("Couldn't upload comment");
  }
};

export const deleteComment = async (commentID) => {
  return requestDeleteComment(commentID);
};

export const getCommentsForPost = async (
  forumPostID,
  lastEvaluatedKey,
  limit
) => {
  return requestGetCommentsForPost(forumPostID, lastEvaluatedKey, limit);
};
