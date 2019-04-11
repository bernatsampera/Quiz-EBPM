import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addScore } from "../../actions/gameActions";

export class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAnswered: false
    };
  }

  handleAnswer(answer_id) {
    this.setState({
      hasAnswered: true
    });
    const { correctAnswer } = this.props.game;
    if (correctAnswer._id == answer_id) {
      this.props.addScore(10);
    } else {
      this.props.addScore(-10);
    }
  }

  render() {
    const { question_text, answers } = this.props;
    const { correctAnswer } = this.props.game;
    const { hasAnswered } = this.state;

    return (
      <div>
        {question_text}

        <div>
          {answers.map((answer, index) => (
            <button
              key={answer._id}
              disabled={hasAnswered}
              className={`btn btn-block m-4 answer ${
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
  { addScore }
)(Question);
