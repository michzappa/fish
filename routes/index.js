let rooms = require("../public/database");

let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Fish Game" });
});

module.exports = router;
