const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const https = require("https");
const fs = require("fs");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// enable everything but multimode

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Declare Routes

app.use(express.static("dist"));
app.use("/pyodide", express.static("pyodide"));
app.get("/", (req, res) => {
  res.send("An alligator approaches!");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// we will pass our 'app' to 'https' server
if (false) {
  console.log(process.env.NODE_ENV);
  https
    .createServer(
      {
        key: fs.readFileSync(__dirname + "/localhost-key.pem"),
        cert: fs.readFileSync(__dirname + "/localhost.pem"),
      },
      app
    )
    .listen(443, () => console.log("Pyodide app listening on port 443!"));
}
module.exports = app;
