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
  endGame,
  setOrder
} from "../../actions/gameActions";
import Countdown from "react-countdown-now";
import Question from "./Question";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import socketIOClient from "socket.io-client";
import Room from "./Room";
import Stats from "./Stats";
import "./game.css";

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
    var socket = socketIOClient("http://172.16.9.15:3001/");

    socket.emit("user", this.props.auth.user);
    socket.on("room", room => {
      this.props.addRoom(room);
    });
    socket.on("start", order => this.startGame(order));
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

  startGame(order) {
    this.props.setOrder(order);
    this.setState({
      play: true
    });
    this.props.getQuestions();

    this.intervalQuestions = setInterval(() => {
      this.props.setQuestionSelected();
    }, 7000);
  }

  clickStart() {
    const order = Array.apply(null, { length: 6 })
      .map(Number.call, Number)
      .sort((a, b) => 0.5 - Math.random());
    this.state.socket.emit("start", order);
  }

  setAnswer(question) {
    this.props.getAnswers(question.answers);
    this.props.getCorrectAnswer(question.correctAnswer);
  }

  endGame() {
    this.state.socket.emit("removeuser", this.props.auth.user);
    // this.state.socket.emit("removeSocket", this.state.socket);
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
    const {
      answers,
      questionSelected,
      score,
      room,
      currentOrder
    } = this.props.game;
    const { play } = this.state;
    let gameContent;
    let roomContent;

    if (isEmpty(room)) {
      roomContent = null;
    } else {
      roomContent = (
        <div>
          <h4> Users ready to play: </h4>
          {room.map((user, index) => (
            <h5 key={index}>{user.name}</h5>
          ))}
          <button
            className="btn btn-success m-5"
            onClick={this.clickStart.bind(this)}
          >
            Start Game
          </button>
        </div>
      );
    }

    if (isEmpty(questionSelected) || isEmpty(answers)) {
      gameContent = null;
    } else {
      if (currentOrder != -1) {
        if (isEmpty(answers)) {
          this.setAnswer(questionSelected);
        }
        gameContent = (
          <div className="row">
            <div className="col-md-8">
              <p> Score: {score}</p>

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
      } else {
        clearInterval(this.intervalQuestions);
        gameContent = (
          <div className="container">
            <Stats room={room} />
            <Room room={room} />
          </div>
        );
      }
    }

    return (
      <div className="game">
        <div className="container text-center p-5">
          <h1> Quiz Game </h1>
          <p> {/* <Countdown date={Date.now() + 5000} />{" "} */}</p>
          {play ? gameContent : roomContent}

          <Link
            to="/dashboard"
            className="btn btn-danger mt-5"
            onClick={this.endGame.bind(this)}
          >
            {" "}
            Return{" "}
          </Link>
        </div>
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
    endGame,
    setOrder
  }
)(Game);
