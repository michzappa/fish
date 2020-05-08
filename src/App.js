import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import JoinGame from "./components/JoinGame/JoinGame";
import ShowHand from "./components/ShowHand/ShowHand";
import AskForCard from "./components/AskForCard/AskForCard";
import MakeClaim from "./components/MakeClaim/MakeClaim";
import PlayerPanel from "./components/PlayerPanel/PlayerPanel";
import ShowLastMove from "./components/ShowLastMove/ShowLastMove";
import ShowTurnName from "./components/ShowTurnName/ShowTurnName";

import { askForCard, makeClaim, inSameHalfSuit } from "./gameMethods";

// the main App of this Fish game, keeps the state, which is passed to children components
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
      team: "",
      player: "",
      teammates: [],
      opponents: [],
      move: "",
      turn: "",
      roomName: "",
      teamName: "",
      playerName: "",
    };

    this.setPlayer = this.setPlayer.bind(this);
    this.updateHand = this.updateHand.bind(this);
    this.refreshState = this.refreshState.bind(this);
    this.getTeammates = this.getTeammates.bind(this);
    this.getOpponents = this.getOpponents.bind(this);
    this.getLastMove = this.getLastMove.bind(this);
    this.getTurnName = this.getTurnName.bind(this);
  }

  // sets a state field to be the overall JSON object for the room
  // this webapp is playing in from the server
  getRoom() {
    fetch("https://fish-backend.herokuapp.com/rooms/" + this.state.roomName)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ room: res });
      });
  }

  // sets getDatabase upon startup
  componentWillMount() {
    this.getRoom();

    setInterval(this.refreshState, 500); // runs every 5 seconds.
  }

  // refreshes the state of this web app from the data in the server
  refreshState() {
    this.getRoom();
    this.updateHand();
    this.getTeammates();
    this.getOpponents();
    this.getLastMove();
    this.getTurnName();
  }

  // sets the room and player of the player of this web app
  setPlayer(room, team, player) {
    this.setState({ roomName: room, teamName: team, playerName: player });
    this.getTeammates();
    this.getOpponents();
    this.getLastMove();
    this.getTurnName();
  }

  // updates the state of the hand, which is given to the ShowHand component
  updateHand() {
    this.getRoom();
    if (!this.state.room[this.state.teamName]) {
    } else {
      if (
        !this.state.room[this.state.teamName].players[this.state.playerName]
      ) {
      } else {
        let hand = this.state.room[this.state.teamName].players[
          this.state.playerName
        ].hand;
        let sortedBySuit = hand.sort((first, second) => {
          return first.slice(-1).localeCompare(second.slice(-1));
        });
        // sorting by card number, preserving order of suits
        let sortedByNumber = sortedBySuit.sort((first, second) => {
          if (first.slice(-1).localeCompare(second.slice(-1)) === 0) {
            return first.slice(0, 2).localeCompare(second.slice(0, 2));
          }
          return first.slice(-1).localeCompare(second.slice(-1));
        });
        let handString = sortedByNumber.join(", ");
        this.setState({ hand: handString });
      }
    }
  }

  // sets a state field to an array of this player's teammates
  getTeammates() {
    let team = this.state.room[this.state.teamName];
    if (team) {
      let players = Object.keys(team.players);
      let score = team.claims.length;
      this.setState({ teammates: players, teamScore: score });
    }
  }

  // sets a state field to an array of this player's opponents
  getOpponents() {
    let opponentTeam;
    if (this.state.teamName === "team1") {
      opponentTeam = this.state.room["team2"];
    } else {
      opponentTeam = this.state.room["team1"];
    }
    if (opponentTeam) {
      let players = Object.keys(opponentTeam.players);
      let score = opponentTeam.claims.length;
      this.setState({ opponents: players, opponentsScore: score });
      this.setState({
        opponents: players,
        opponentsScore: opponentTeam.claims.length,
      });
    }
  }

  // updates the state of this app with the last move performed in this game room
  getLastMove() {
    if (this.state.room.move) {
      let lastMove = this.state.room.move;
      this.setState({ move: lastMove });
    }
  }

  // updates the state of this app with the player whose turn it is in this game room
  getTurnName() {
    if (this.state.room.turn) {
      let currTurn = this.state.room.turn;
      this.setState({ turn: currTurn });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Logo />
          </div>
          <JoinGame
            rooms={this.state.rooms}
            setPlayerForApp={this.setPlayer}
            updateHand={this.updateHand}
          />
        </header>

        <div className="game-information">
          <div className="game-stat">
            <h1>Room: {this.state.roomName}</h1>
          </div>
          <div className="game-stat">
            <PlayerPanel
              teammates={this.state.teammates}
              teamScore={this.state.teamScore}
              opponents={this.state.opponents}
              opponentsScore={this.state.opponentsScore}
            />
          </div>
          <div className="game-stat">
            <ShowHand
              hand={this.state.hand}
              playerName={this.state.playerName}
            />
          </div>
          <div className="game-stat">
            <ShowLastMove move={this.state.move} />
          </div>
          <div className="game-stat">
            <ShowTurnName turn={this.state.turn} />
          </div>
        </div>

        <div>
          <AskForCard
            room={this.state.roomName}
            team={this.state.teamName}
            player={this.state.playerName}
            askCardFunc={askForCard}
            opponents={this.state.opponents}
            inSameHalfSuit={inSameHalfSuit}
          />
          <MakeClaim
            room={this.state.roomName}
            team={this.state.teamName}
            makeClaimFunc={makeClaim}
            teammates={this.state.teammates}
          />
        </div>
      </div>
    );
  }
}

export default App;
