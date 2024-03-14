const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./routes/api/users");
const links = require("./routes/api/links");
const categorys = require("./routes/api/categorys");
// const admin = require("./routes/api/admin");
const log = require("./utils/log");
dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    log("Mongodb is on");
  })
  .on("error", (error) => {
    log(error);
  });
app.use("/api/links", links);
app.use("/api/users", users);
app.use("/api/categorys", categorys);
// app.use("/admin", admin);
app.listen(port, () => log(`Started on http://localhost:${port}`));
