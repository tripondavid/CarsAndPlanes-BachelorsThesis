import {
  getCommentsForPost,
  addCommentToPost,
} from "../controller/commentsController.js";
import express from "express";

const commentsRouter = express.Router();

commentsRouter.get("/", getCommentsForPost);
commentsRouter.post("/new/comment", addCommentToPost);

export default commentsRouter;
