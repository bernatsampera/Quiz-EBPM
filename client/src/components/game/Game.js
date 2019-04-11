import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getQuestions,
  getAnswers,
  getCorrectAnswer
} from "../../actions/gameActions";
import Question from "./Question";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

export class Game extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  setAnswer(question) {
    this.props.getAnswers(question.answers);
    this.props.getCorrectAnswer(question.correctAnswer);
  }

  render() {
    const { questions, answers } = this.props.game;

    let gameContent;

    if (isEmpty(questions)) {
      gameContent = <Spinner />;
    } else {
      console.log(questions);
      if (isEmpty(answers)) {
        this.setAnswer(questions[0]);
      }
      gameContent = (
        <div>
          {questions.map(question => (
            <Question key={question._id} question={question} />
          ))}
        </div>
      );
    }

    return (
      <div>
        <h1> This is the game </h1>
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
  { getQuestions, getAnswers, getCorrectAnswer }
)(Game);
