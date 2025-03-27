import express, { json } from "express";
import serverless from "serverless-http";
import forumPostsRouter from "./routes/forumPostsRoutes.js";
import usersRouter from "./routes/authenticationRoutes.js";
import commentsRouter from "./routes/commentsRoutes.js";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const app = express();
app.use(json());

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Your frontend domain
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

  // Handle preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Respond to OPTIONS with status 200 OK
  }

  next();
});

// Function to retrieve the public key
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      callback(null, key.publicKey || key.rsaPublicKey);
    }
  });
};

// Middleware to validate `accessToken`
const validateAccessToken = (req, res, next) => {
  const token = req.headers.authorization; // Extract token from header
  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }
  console.log(token);

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ["RS256"], // Cognito uses RS256
      issuer: process.env.ISSUER,
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      req.user = decoded; // Attach decoded token to request
      next(); // Proceed to the next middleware or route
    }
  );
};

app.use("/forumPosts", validateAccessToken, forumPostsRouter);
app.use("/users", usersRouter);
app.use("/comments", validateAccessToken, commentsRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
