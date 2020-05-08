import React from "react";

class ShowLastMove extends React.Component {
  render() {
    return (
      <div>
        <h1>Last move: {this.props.move}</h1>
      </div>
    );
  }
}

export default ShowLastMove;
