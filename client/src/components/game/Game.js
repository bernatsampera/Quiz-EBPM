import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getQuestions,
  getAnswers,
  getCorrectAnswer,
  setQuestionSelected,
  addRoom,
  endGame
} from "../../actions/gameActions";
import Countdown from "react-countdown-now";
import Question from "./Question";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import socketIOClient from "socket.io-client";
import Room from "./Room";

export class Game extends Component {
  intervalQuestions = 0;
  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      play: false
    };
  }

  componentDidMount() {
    // Start on socket
    var socket = socketIOClient("http://192.168.16.73:3001/");

    socket.emit("user", this.props.auth.user);
    socket.on("room", room => {
      this.props.addRoom(room);
    });
    socket.on("start", () => this.startGame());
    this.setState({
      socket,
      play: false
    });
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.game.questionSelected != this.props.game.questionSelected) {
      const { questionSelected } = nextprops.game;
      this.setAnswer(questionSelected);
    }

    if (nextprops.game.score != this.props.game.score) {
      const { user } = this.props.auth;
      const { score } = nextprops.game;
      this.state.socket.emit("score", { user, score });
    }
  }

  startGame() {
    this.setState({
      play: true
    });
    this.props.getQuestions();

    this.intervalQuestions = setInterval(() => {
      this.props.setQuestionSelected();
    }, 5000);
  }

  clickStart() {
    this.state.socket.emit("start", {});
  }

  setAnswer(question) {
    this.props.getAnswers(question.answers);
    this.props.getCorrectAnswer(question.correctAnswer);
  }

  endGame() {
    this.state.socket.emit("removeuser", this.props.auth.user);
    this.state.socket.emit("removeSocket", this.state.socket);
    this.setState({
      play: false
    });
    clearInterval(this.intervalQuestions);
    this.props.endGame();
  }

  componentWillUnmount() {
    this.endGame();
  }

  render() {
    const { answers, questionSelected, score, room } = this.props.game;
    const { play } = this.state;
    let gameContent;
    let roomContent;
    if (isEmpty(room)) {
      roomContent = <Spinner />;
    } else {
      roomContent = (
        <div>
          {room.map((user, index) => (
            <p key={index}>{user.name}</p>
          ))}
          <button
            className="btn btn-success"
            onClick={this.clickStart.bind(this)}
          >
            Start Game
          </button>
        </div>
      );
    }

    if (isEmpty(questionSelected) || isEmpty(answers)) {
      gameContent = <Spinner />;
    } else {
      if (isEmpty(answers)) {
        this.setAnswer(questionSelected);
      }
      gameContent = (
        <div className="row">
          <div className="col-md-8">
            <Question
              key={questionSelected._id}
              question_text={questionSelected.text}
              answers={answers}
            />
          </div>
          <div className="col-md-4">
            <Room room={room} />
          </div>
        </div>
      );
    }

    return (
      <div className="container text-center m-5">
        <h1> This is the game </h1>
        <p> Score: {score}</p>
        <p> {/* <Countdown date={Date.now() + 5000} />{" "} */}</p>
        {play ? gameContent : roomContent}

        <Link
          to="/dashboard"
          className="btn btn-danger mt-5"
          onClick={this.endGame.bind(this)}
        >
          {" "}
          Exit{" "}
        </Link>
      </div>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getQuestions,
    getAnswers,
    getCorrectAnswer,
    setQuestionSelected,
    addRoom,
    endGame
  }
)(Game);
