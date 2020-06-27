import React from "react";

// shows the teammates and opponents of the player of this app
class PlayerPanel extends React.Component {
  constructor(props) {
    super(props);

    this.processTeammates = this.processTeammates.bind(this);
    this.processOpponents = this.processOpponents.bind(this);
  }

  render() {
    return (
      <div>
        <h2>
          Teammates: {this.processTeammates()} <br></br>Score:{" "}
          {this.props.teamScore}
        </h2>
        <h2>
          Opponents: {this.processOpponents()} <br></br>Score:{" "}
          {this.props.opponentsScore}
        </h2>
      </div>
    );
  }

  // turns list of players into a string
  processTeammates() {
    if (this.props.teammates) {
      return this.props.teammates.join(", ");
    }
  }

  // turns list of players into a string
  processOpponents() {
    if (this.props.opponents) {
      return this.props.opponents.join(", ");
    }
  }
}

export default PlayerPanel;
