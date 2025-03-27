import {
  registerUser,
  authenticateUser,
} from "../controller/authenticationController.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", authenticateUser);

export default usersRouter;
