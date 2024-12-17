var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const fs = require("fs");

var app = express();

var corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initialize Routes
let routes = fs.readdirSync(path.join(__dirname, "src/routes"));
let ListOfPath = [];

// Load routes dynamically
routes.forEach((file) => {
  let fullPath = path.join(__dirname, "src/routes", file);
  let isDirectory = fs.lstatSync(fullPath).isDirectory();

  if (isDirectory) {
    let folderRoutes = fs.readdirSync(fullPath);
    folderRoutes.forEach((subFile) => {
      ListOfPath.push(path.join(fullPath, subFile));
    });
  } else {
    ListOfPath.push(fullPath);
  }
});

// Register routes with the app
ListOfPath.forEach((routePath) => {
  // // Skip specific files if needed
  // if (!routePath.includes("firebase_connection.js")) {
  console.log(routePath);
  app.use("/api", require(routePath));
  // }
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error(`This path is not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  const statusCode = err.status || 500;
  const response = {
    success: false, // Indicates the request was not successful
    message: err.message || "Internal Server Error",
  };

  // Include error details only in development mode
  if (req.app.get("env") === "development") {
    response.error = err;
  }

  // Respond with JSON for API calls like Postman
  res.status(statusCode).json(response);
});

module.exports = app;
