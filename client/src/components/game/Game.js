import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getQuestions,
  getAnswers,
  getCorrectAnswer,
  setQuestionSelected
} from "../../actions/gameActions";
import Countdown from "react-countdown-now";
import Question from "./Question";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

export class Game extends Component {
  componentDidMount() {
    this.props.getQuestions();
    this.startGame();
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.game.questionSelected != this.props.game.questionSelected) {
      const { questionSelected } = nextprops.game;
      this.setAnswer(questionSelected);
    }
  }

  startGame() {
    setInterval(() => {
      this.props.setQuestionSelected();
    }, 5000);
  }

  setAnswer(question) {
    this.props.getAnswers(question.answers);
    this.props.getCorrectAnswer(question.correctAnswer);
  }

  render() {
    const { answers, questionSelected } = this.props.game;

    let gameContent;
    if (isEmpty(questionSelected)) {
      gameContent = <Spinner />;
    } else {
      if (isEmpty(answers)) {
        this.setAnswer(questionSelected);
      }
      gameContent = (
        <div>
          <Question
            key={questionSelected._id}
            question_text={questionSelected.text}
            answers={answers}
          />
        </div>
      );
    }

    return (
      <div>
        <h1> This is the game </h1>
        <Countdown date={Date.now() + 5000} />
        {gameContent}
      </div>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  { getQuestions, getAnswers, getCorrectAnswer, setQuestionSelected }
)(Game);
