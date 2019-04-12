import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export class Dashboard extends Component {
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> Dashboard </h1>
              <div>
                <p className="lead text-muted">Welcome {user.name}</p>
              </div>
              <Link className="nav-link btn btn-primary" to="/game">
                Play
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
