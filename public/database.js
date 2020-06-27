let _ = require("underscore");

// all the cards in the game, a 54 card deck
const cards = [
  "2-H",
  "3-H",
  "4-H",
  "5-H",
  "6-H",
  "7-H",
  "9-H",
  "10-H",
  "J-H",
  "Q-H",
  "K-H",
  "A-H",
  "2-D",
  "3-D",
  "4-D",
  "5-D",
  "6-D",
  "7-D",
  "9-D",
  "10-D",
  "J-D",
  "Q-D",
  "K-D",
  "A-D",
  "2-S",
  "3-S",
  "4-S",
  "5-S",
  "6-S",
  "7-S",
  "9-S",
  "10-S",
  "J-S",
  "Q-S",
  "K-S",
  "A-S",
  "2-C",
  "3-C",
  "4-C",
  "5-C",
  "6-C",
  "7-C",
  "9-C",
  "10-C",
  "J-C",
  "Q-C",
  "K-C",
  "A-C",
  "8-H",
  "8-D",
  "8-S",
  "8-C",
  "B-J",
  "R-J",
];

// represents a game room, with teams
class Room {
  constructor(name) {
    this.name = name;
    this.team1 = new Team();
    this.team2 = new Team();
    // giving each room a different shuffled deck of cards, to be distributed to players
    this.cards = _.shuffle(cards);
    // a string representing the last move performed in this room
    this.move = "";
    this.turn = "";
  }

  // returns the next hand of cards in this room's deck (nine cards)
  getNextHand() {
    let hand = [];
    for (let i = 0; i < 9; i += 1) {
      let card = this.cards.pop();
      hand.push(card);
    }
    return hand;
  }
}

// represents a team in the fish game, with players and made claims
class Team {
  constructor() {
    this.players = {};
    this.claims = [];
  }

  // adds a player with the given name and hand to this team
  addPlayer(playername, hand) {
    this.players[playername] = new Player(playername, hand);
  }
}

// represents a player in the fish game
class Player {
  constructor(name, hand) {
    this.name = name;
    this.hand = hand;
  }
}

let test = new Room("test");

// initializing test room
test.team1.addPlayer("ryan", test.getNextHand());
test.team1.addPlayer("owen", test.getNextHand());
test.team2.addPlayer("erin", test.getNextHand());
test.team2.addPlayer("morgan", test.getNextHand());
test.team2.addPlayer("santiago", test.getNextHand());

let rooms = {
  test: test,
  addRoom(name) {
    rooms[name] = new Room(name);
  },
};

module.exports = rooms;
