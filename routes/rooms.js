let teamsRouter = require("./teams");

let rooms = require("../public/database");
let bodyParser = require("body-parser");

let express = require("express");
let router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// attaches the specific requested room to the request itself
router.param("name", (req, res, next, id) => {
  if (rooms[id]) {
    req.room = rooms[id];
    next();
  } else {
    res.status(404).send("Given room does not exist");
  }
});

// gets the requested room from the server
router.get("/:name", (req, res, next) => {
  let room = req.room;
  res.send(room);
});

// routing through the teams router to modify teams more directly
router.use("/:name/teams", teamsRouter);

// gets all the rooms in the server
router.get("/", (req, res, next) => {
  res.send(rooms);
});

// adds a room of the given name to the rooms in the server
router.post("/", (req, res, next) => {
  let name = req.body.name;
  if (!rooms[name]) {
    rooms.addRoom(name);
    res.status(200).send("created room: " + name);
  } else {
    res.status(400).send("room " + name + " already exists");
  }
});

// adds a player to the given room in a random team
router.post("/:name", (req, res, next) => {
  let playerName = req.body.name;

  let team1players = req.room.team1.players;
  let team1size = Object.keys(team1players).length;

  let team2players = req.room.team2.players;
  let team2size = Object.keys(team2players).length;

  let teamAdded;

  if (team1size > 2 && team2size > 2) {
    res.status(200).send(`both teams have three players`);
  } else {
    let hand = req.room.getNextHand();
    // randomly put the new player into a team, except if one team is full
    if (Math.random() < 0.5) {
      // want to add to team 1
      if (team1size > 2) {
        req.room.team2.addPlayer(playerName, hand);
        team2size += 1;
        teamAdded = "team2";
      } else {
        req.room.team1.addPlayer(playerName, hand);
        team1size += 1;
        teamAdded = "team1";
      }
    } else {
      if (team2size > 2) {
        req.room.team1.addPlayer(playerName, hand);
        team1size += 1;
        teamAdded = "team1";
      } else {
        req.room.team2.addPlayer(playerName, hand);
        team2size += 1;
        teamAdded = "team2";
      }
    }
    req.room.turn = playerName;
    res.status(200).send(teamAdded);
  }
});

// gets the last move performed in this room
router.get("/:name/move", (req, res, next) => {
  let room = req.room;
  res.send(room.move);
});

// changes the most recent move in this room to be the move attached
// to the request body
router.put("/:name/move", (req, res, next) => {
  let move = req.body.move;
  req.room.move = move;
  res.send(move);
});

// gets the player name whose turn it is in this room
router.get("/:name/turn", (req, res, next) => {
  let room = req.room;
  res.send(room.turn);
});

// changes whose turn it is in this room to the name attached to the request body
router.put("/:name/turn", (req, res, next) => {
  let playerName = req.body.turn;
  req.room.turn = playerName;
  res.send(playerName);
});
module.exports = router;
