let usersRouter = require("./users");

let express = require("express");
let router = express.Router();

router.use("/:team/users", usersRouter);
/*
    The only valid team id's are team1 and team2
*/

// attaches the specific requested team to the request itself
router.param("team", (req, res, next, id) => {
  if (req.room[id]) {
    req.team = req.room[id];
    next();
  } else {
    res.status(404).send(`Given team ${id} does not exist`);
  }
});

// gets the claims for the given team
router.get("/:team/claims", (req, res, next) => {
  let claims = req.team.claims;
  res.send(claims);
});

// puts the claims object in the request body into the specified team
router.put("/:team", (req, res, next) => {
  let claims = req.body.claims;
  req.team.claims = claims;
  res.status(200).send("added claim " + claims);
});

// gets the specific team from the room attached to the request
router.get("/:team", (req, res, next) => {
  let team = req.team;
  res.send(team);
});

module.exports = router;
