import React from "react";
import { Button } from "react-bootstrap";

class JoinGame extends React.Component {
  constructor(props) {
    super(props);

    this.addRoomClick = this.addRoomClick.bind(this);
    this.deleteRoomClick = this.deleteRoomClick.bind(this);
    this.joinRoomClick = this.joinRoomClick.bind(this);

    this.state = {
      roomToBeMade: "",
      roomToBeJoined: "",
      joiningPlayerName: "",
    };
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <input
              placeholder="Room Name"
              type="text"
              name="Room name"
              value={this.state.roomToBeMade}
              onChange={this.updateRoomToBeMadeState.bind(this)}
            />
            <Button variant="primary" size="lg" onClick={this.addRoomClick}>
              Add Room
            </Button>
            <Button variant="primary" size="lg" onClick={this.deleteRoomClick}>
              Delete Room
            </Button>
          </form>
        </div>
        <div>
          <form>
            <input
              placeholder="Room Name"
              type="text"
              name="Room name"
              value={this.state.roomToBeJoined}
              onChange={this.updateJoiningRoomState.bind(this)}
            />
            <input
              placeholder="Player Name"
              type="text"
              name="Player name"
              value={this.state.joiningPlayerName}
              onChange={this.updateJoiningPlayerState.bind(this)}
            />
            <Button variant="primary" size="lg" onClick={this.joinRoomClick}>
              Submit
            </Button>
          </form>
        </div>
        <div></div>
      </div>
    );
  }

  updateRoomToBeMadeState(event) {
    this.setState({ roomToBeMade: event.target.value });
  }

  updateJoiningRoomState(event) {
    this.setState({ roomToBeJoined: event.target.value });
  }

  updateJoiningPlayerState(event) {
    this.setState({ joiningPlayerName: event.target.value });
  }

  // posts the room represented by the state of this component
  addRoomClick() {
    fetch("https://fish-backend.herokuapp.com/rooms/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: this.state.roomToBeMade }),
    });

    this.setState({
      roomToBeMade: "",
      roomToBeJoined: "",
      joiningPlayerName: "",
    });
  }

  // deletes the room represented by the state of this component
  deleteRoomClick() {
    fetch("https://fish-backend.herokuapp.com/rooms/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ name: this.state.roomToBeMade }),
    });

    this.setState({
      roomToBeMade: "",
      roomToBeJoined: "",
      joiningPlayerName: "",
    });
  }

  // posts the player to the room represented by the state of this component, if it
  // is not already full
  joinRoomClick() {
    let roomName = this.state.roomToBeJoined;
    let playerName = this.state.joiningPlayerName;

    fetch("https://fish-backend.herokuapp.com/rooms/" + roomName)
      .then((res) => res.json())
      .then((res) => {
        let team1Size = Object.keys(res.team1.players).length;
        let team2Size = Object.keys(res.team2.players).length;

        if (team1Size < 3 || team2Size < 3) {
          fetch("https://fish-backend.herokuapp.com/rooms/" + roomName, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ name: playerName }),
          })
            .then((res) => res.text())
            .then((team) => {
              if (team === "Given room does not exist") {
                alert("Please enter a room which has been created");
              } else {
                this.props.setPlayerForApp(roomName, team, playerName);
                this.props.updateHand();
                this.setState({
                  roomToBeMade: "",
                  roomToBeJoined: "",
                  joiningPlayerName: "",
                });
              }
            });
        } else {
          alert("This room is full");
        }
      });
  }
}

export default JoinGame;
