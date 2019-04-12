import React, { Component } from "react";
import { connect } from "react-redux";
import { getStats, postStat } from "../../actions/statsActions";
import PropTypes from "prop-types";

export class Stats extends Component {
  render() {
    return <div>Ranking</div>;
  }
}

Stats.propTypes = {};

export default connect(
  null,
  { getStats, postStat }
)(Stats);
