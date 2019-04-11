import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAnswered: false,
      isAnswerCorrect: null
    };
  }

  handleAnswer(answer_id) {
    this.setState({});
    const { correctAnswer } = this.props.game;
    if (correctAnswer._id == answer_id) {
      this.setState({
        hasAnswered: true,
        isAnswerCorrect: true
      });
    } else {
      this.setState({
        hasAnswered: true,
        isAnswerCorrect: false
      });
    }
  }

  render() {
    const { question_text, answers } = this.props;
    const { correctAnswer } = this.props.game;
    const { hasAnswered, isAnswerCorrect } = this.state;

    return (
      <div>
        {question_text}

        <div>
          {answers.map((answer, index) => (
            <button
              key={answer._id}
              className={`btn btn-block m-4 ${
                !hasAnswered
                  ? ""
                  : correctAnswer._id == answer._id
                  ? "btn-success"
                  : "btn-danger"
              }`}
              onClick={this.handleAnswer.bind(this, answer._id)}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question_text: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  {}
)(Question);
