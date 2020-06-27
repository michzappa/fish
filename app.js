let express = require("express");
let path = require("path");
let logger = require("morgan");
let cors = require("cors");

let roomsRouter = require("./routes/rooms");

let app = express();
app.use(cors());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// gives json information about the state of the rooms
app.use("/rooms", roomsRouter);

// displays the react page
app.use(express.static(path.join(__dirname, "../frontend/build")));

module.exports = app;
