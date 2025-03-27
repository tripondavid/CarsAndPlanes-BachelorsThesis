import {
  getPosts as getPostsService,
  getUserPosts as getUserPostsService,
  addPost as addPostService,
  getPostsBySearch as getPostsBySearchService,
  generatePresignedUrl,
} from "../service/forumPostsService.js";

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

export const getPresignedUrl = async (req, res) => {
  const { fileName, fileType } = req.query;

  if (!fileName || !fileType) {
    return res
      .status(400)
      .json({ error: "fileName and fileType are required" });
  }

  if (!allowedFileTypes.includes(fileType)) {
    return res.status(400).json({ error: "Invalid file type" });
  }

  try {
    const response = await generatePresignedUrl(fileName, fileType);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const lastEvaluatedKey = req.query.lastEvaluatedKey || null;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

    const posts = await getPostsService(lastEvaluatedKey, limit);
    if (posts) {
      return res.json(posts);
    }
  } catch (error) {
    console.error("Error occurred:", error); // Log the error for debugging
    return res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export const getPostsBySearch = async (req, res) => {
  //TODO: modify for search
  try {
    const content = req.query.content;
    const lastEvaluatedKey = req.query.lastEvaluatedKey || null;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

    const posts = await getPostsBySearchService(
      content,
      lastEvaluatedKey,
      limit
    );
    if (posts) {
      return res.json(posts);
    }
  } catch (error) {
    console.error("Error occurred:", error); // Log the error for debugging
    return res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const lastEvaluatedKey = req.query.lastEvaluatedKey || null;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const username = req.user.username;

    const posts = await getUserPostsService(username, lastEvaluatedKey, limit);
    if (posts) {
      return res.json(posts);
    }
  } catch (error) {
    console.error("Error occurred:", error); // Log the error for debugging
    return res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export const addPost = async (req, res) => {
  try {
    if (!req.body.content && !req.body.mediaFileURL) {
      return res.status(400).json("Invalid body");
    }
    const username = req.user.username;
    const content = req.body.content ? req.body.content : null;
    const mediaFileURL = req.body.mediaFileURL ? req.body.mediaFileURL : null;
    const response = await addPostService(content, mediaFileURL, username);
    if (response) {
      return res.json(response);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
