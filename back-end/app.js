const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

require("./config/db");
require("dotenv");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
let helmet = require("helmet");
app.use(helmet());
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
//Middleware toujours éxécutés
//express json sert a lire les req.body<params>
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
//le .config siginifie qu'il faut aller chercher mes variables d'environnement dans ({ path: "./config/.env" })
require("dotenv").config({ path: "./config/.env" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//Routes

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
//app.use("api/user", authRoutes);
