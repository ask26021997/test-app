if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

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

app.use("/", indexRouter);

//

app.listen(process.env.TEST_APP_PORT || 4000);
