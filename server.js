if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Connected to mongoDB");
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

// app.use("/", indexRouter);
// app.use("/authors", authorRouter);

// //
// const host = "0.0.0.0";
// const port = process.env.TEST_APP_PORT || 4000;
// app.listen(port, host, function () {
//   console.log("App is running on port " + port);
// });

app.get("/", (req, res) => {
  res.status(200).send("Hello server is running").end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
