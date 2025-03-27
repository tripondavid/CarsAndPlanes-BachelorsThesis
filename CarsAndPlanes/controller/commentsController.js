import {
  getCommentsForPost as getCommentsForPostService,
  addCommentToPost as addCommentToPostService,
} from "../service/commentsService.js";

export const getCommentsForPost = async (req, res) => {
  if (!req.query.forumPostID) {
    return res.status(400).json("Invalid body");
  }
  const forumPostID = req.query.forumPostID;
  const lastEvaluatedKey = req.query.lastEvaluatedKey || null;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const comments = await getCommentsForPostService(
    forumPostID,
    lastEvaluatedKey,
    limit
  );

  return res.json(comments);
};

export const addCommentToPost = async (req, res) => {
  try {
    if (!req.body.forumPostID || !req.body.content) {
      return res.status(400).json("Invalid body");
    }
    const username = req.user.username;
    const postID = req.body.forumPostID;
    const content = req.body.content;

    const response = await addCommentToPostService(postID, content, username);
    if (response) {
      return res.json(response);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
