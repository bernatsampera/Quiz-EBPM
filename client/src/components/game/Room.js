import React, { Component } from "react";
import PropTypes from "prop-types";

export class Room extends Component {
  render() {
    const { room } = this.props;

    return (
      <div>
        <h3> Game Stats </h3>{" "}
        {room.map((user, index) => (
          <div key={index}>
            <span>{`User: ${user.name}, Score: ${user.score}`}</span>
          </div>
        ))}
      </div>
    );
  }
}

Room.propTypes = {
  room: PropTypes.array.isRequired
};

export default Room;
