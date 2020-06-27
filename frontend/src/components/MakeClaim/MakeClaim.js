import React from "react";
import { Button } from "react-bootstrap";

class MakeClaim extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.makeClaim = this.makeClaim.bind(this);
  }

  render() {
    return (
      <div>
        <h1>
          Make Claim, enter cards for each teammate<br></br> separated by
          commas: "card,card,card,card,card,card"
        </h1>
        <form>
          <label htmlFor="name1">{this.props.teammates[0]}</label>
          <input
            placeholder="cards"
            type="text"
            id="name1"
            value={this.state.teammate1Cards}
            onChange={this.setTeammate1ClaimState.bind(this)}
          />
          <label htmlFor="name1">{this.props.teammates[1]}</label>
          <input
            placeholder="cards"
            type="text"
            id="name2"
            value={this.state.teammate2Cards}
            onChange={this.setTeammate2ClaimState.bind(this)}
          />
          <label htmlFor="name1">{this.props.teammates[2]}</label>
          <input
            placeholder="cards"
            type="text"
            id="name3"
            value={this.state.teammate3Cards}
            onChange={this.setTeammate3ClaimState.bind(this)}
          />
          <Button variant="primary" size="lg" onClick={this.makeClaim}>
            Submit Claim
          </Button>
        </form>
      </div>
    );
  }

  // sets a state for the cards claimed to be had by teammate 1
  setTeammate1ClaimState(event) {
    let listOfCards = event.target.value.split(",");
    this.setState({ teammate1Cards: listOfCards });
  }

  // sets a state for the cards claimed to be had by teammate 2
  setTeammate2ClaimState(event) {
    let listOfCards = event.target.value.split(",");
    this.setState({ teammate2Cards: listOfCards });
  }

  // sets a state for the cards claimed to be had by teammate 3
  setTeammate3ClaimState(event) {
    let listOfCards = event.target.value.split(",");
    this.setState({ teammate3Cards: listOfCards });
  }

  // takes the cards claimed in the state and attempts to make the claim,
  // if it is a good claim the cards are removed from the players' hands
  // and added to this team's claims tally
  makeClaim() {
    let playerCardsList = [];
    if (this.state.teammate1Cards) {
      playerCardsList.push([
        this.props.teammates[0],
        this.state.teammate1Cards,
      ]);
    }
    if (this.state.teammate2Cards) {
      playerCardsList.push([
        this.props.teammates[1],
        this.state.teammate2Cards,
      ]);
    }
    if (this.state.teammate3Cards) {
      playerCardsList.push([
        this.props.teammates[2],
        this.state.teammate3Cards,
      ]);
    }

    console.log(playerCardsList);
    this.props.makeClaimFunc(this.props.room, this.props.team, playerCardsList);

    this.setState({
      teammate1Cards: "",
      teammate2Cards: "",
      teammate3Cards: "",
    });
  }
}

export default MakeClaim;
