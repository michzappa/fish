import React from "react";

class ShowHand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>{this.props.playerName}'s Hand</h1>
        <p className="App-intro">{this.props.hand}</p>
      </div>
    );
  }
}

export default ShowHand;
