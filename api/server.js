const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Router & MW
const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

//Global
server.use(helmet());
server.use(cors());
server.use(express.json());

//Endpoints
server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

//Base url
server.get("/", (req, res) => {
  res.json({
    api: "Server starts here, Navigate to /api",
  });
});

server.get("/api", (req, res) => {
  res.json({
    message: "API starts here, Navigate to /auth or /jokes",
  });
});

module.exports = server;
