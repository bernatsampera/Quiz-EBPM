import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStats, postStat } from "../../actions/statsActions";

export class Stats extends Component {
  render() {
    const { room } = this.props;
    let winner = room[0];
    room.forEach(user => (user.score >= winner.score ? (winner = user) : null));
    let statsContent;

    room.forEach(user => this.props.postStat(user));

    if (room.filter(user => user.score == winner.score).length > 1) {
      statsContent = <p> DRAW! </p>;
    } else {
      statsContent = (
        <h2>
          {" "}
          the winner is {winner.name} with {winner.score} points{" "}
        </h2>
      );
    }

    return <div> {statsContent} </div>;
  }
}

Stats.propTypes = {
  room: PropTypes.array.isRequired
};

export default connect(
  null,
  { getStats, postStat }
)(Stats);
