import React from "react";

class ShowTurnName extends React.Component {
  render() {
    return (
      <div>
        <h1>Current Turn: {this.props.turn}</h1>
      </div>
    );
  }
}

export default ShowTurnName;
