let express = require("express");
let router = express.Router();

// at this point the room and the team have been attached to the request

// attaches the specific requested team to the request itself
router.param("player", (req, res, next, id) => {
  if (req.team.players[id]) {
    req.player = req.team.players[id];
    next();
  } else {
    res.status(404).send(`Given player ${id} does not exist`);
  }
});

// gets the specific player from the tean attached to the request
router.get("/:player", (req, res, next) => {
  let player = req.player;
  res.send(player);
});

// gets all the players on the team attached to the request body
router.get("/", (req, res, next) => {
  res.send(req.team.players);
});

// modifies the hand of this player
router.put("/:player", (req, res, next) => {
  let hand = req.body.hand;

  req.player.hand = hand;
  res.status(200).send("changed hand of: " + req.params.player);
});
module.exports = router;
