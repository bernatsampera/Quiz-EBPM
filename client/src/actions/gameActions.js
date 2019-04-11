import axios from "axios";
import {
  GET_QUESTIONS,
  GET_ANSWERS,
  GET_CORRECT_ANSWER,
  SET_QUESTION_SELECTED
} from "./types";

export const getQuestions = () => dispatch => {
  axios
    .get("api/game/question")
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const setQuestionSelected = () => dispatch => {
  dispatch({
    type: SET_QUESTION_SELECTED
  });
};

export const getAnswers = answers => dispatch => {
  axios
    .get("/api/game/answers", { params: { answers: answers.join(",") } })
    .then(res =>
      dispatch({
        type: GET_ANSWERS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getCorrectAnswer = correctanswer => dispatch => {
  axios
    .get("/api/game/correctanswer", { params: { correctanswer } })
    .then(res =>
      dispatch({
        type: GET_CORRECT_ANSWER,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
