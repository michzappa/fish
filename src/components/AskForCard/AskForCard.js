import React from "react";
import { Button } from "react-bootstrap";

// an interface to ask an opponent player for a specific card
class AskForCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { opponents: [], playerAsked: "", desiredCard: "" };

    this.askForCard = this.askForCard.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Ask a Player for a Card</h1>
        <form>
          <select
            id="choose-opponent"
            onChange={this.updatePlayerAskedState.bind(this)}
          >
            <option selected="selected">Select Opponent</option>
            <option value={this.props.opponents[0]}>
              {this.props.opponents[0]}
            </option>
            <option value={this.props.opponents[1]}>
              {this.props.opponents[1]}
            </option>
            <option value={this.props.opponents[2]}>
              {this.props.opponents[2]}
            </option>
          </select>
          <input
            placeholder="Card"
            type="text"
            name="card"
            value={this.state.desiredCard}
            onChange={this.updatedesiredCardState.bind(this)}
          />
          <Button variant="primary" size="lg" onClick={this.askForCard}>
            Ask for Card
          </Button>
        </form>
      </div>
    );
  }

  // sets the playerAsked state
  updatePlayerAskedState(event) {
    this.setState({ playerAsked: event.target.value });
  }

  // sets the desired card state
  updatedesiredCardState(event) {
    this.setState({ desiredCard: event.target.value });
  }

  // uses the state to ask the player for the desired card
  askForCard() {
    fetch("https://fish-backend.herokuapp.com/rooms/" + this.props.room + "/turn/")
      .then((res) => res.text())
      .then((res) => {
        console.log(res + "   " + this.props.player);
        if (res === this.props.player) {
          document.getElementById("choose-opponent").selectedIndex = 0;
          if (
            this.state.playerAsked !== "Select Opponent" &&
            this.state.playerAsked !== ""
          ) {
            this.props.askCardFunc(
              this.props.room,
              this.props.team,
              this.props.player,
              this.state.playerAsked,
              this.state.desiredCard
            );
          }
          this.setState({ playerAsked: "", desiredCard: "" });
        }
      });
  }
}

export default AskForCard;
