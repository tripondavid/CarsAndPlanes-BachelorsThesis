import {
  getPosts,
  addPost,
  getPresignedUrl,
  getUserPosts,
  getPostsBySearch,
} from "../controller/forumPostsController.js";
import express from "express";

const forumPostsRouter = express.Router();

forumPostsRouter.get("/", getPosts);
forumPostsRouter.post("/new/post", addPost);
forumPostsRouter.get("/search/posts", getPostsBySearch);
forumPostsRouter.get("/my-posts", getUserPosts);
forumPostsRouter.get("/media/upload/url", getPresignedUrl);

export default forumPostsRouter;
