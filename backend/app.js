var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const crypto = require('crypto');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var termekRouter = require("./routes/termek");
var contactRouter = require("./routes/contact"); // Import the contact route


const cors = require("cors"); //Cross-Origin Resource Sharing

var app = express();

var corsOptions = {
  origin: "http://localhost:5173", //frontend URL és port
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/termekek", termekRouter);
app.use("/api/contact", contactRouter); // Use the contact route


module.exports = app;
