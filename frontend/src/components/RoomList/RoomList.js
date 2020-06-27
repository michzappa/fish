import React from "react";

class RoomList extends React.Component {
  constructor(props) {
    super(props);

    this.processRoomsIntoList = this.processRoomsIntoList.bind(this);
  }
  render() {
    return (
      <div>
        Rooms:
        <ul>{this.processRoomsIntoList(this.props.rooms)}</ul>
      </div>
    );
  }

  // returns an unordered list of all the rooms in the server,
  // from the prop which is a list of all these rooms
  processRoomsIntoList(rooms) {
    let list = [];
    try {
      rooms.forEach((room) => {
        list.push(<li>{room}</li>);
      });
      return list;
    } catch (err) {
      console.log(err);
    }
  }
}

export default RoomList;
