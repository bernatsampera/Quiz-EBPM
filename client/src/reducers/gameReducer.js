import {
  GET_QUESTIONS,
  GET_ANSWERS,
  GET_CORRECT_ANSWER
} from "../actions/types";

const initialState = {
  questions: [],
  answers: [],
  correctAnswer: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case GET_ANSWERS:
      return {
        ...state,
        answers: action.payload
      };
    case GET_CORRECT_ANSWER:
      return {
        ...state,
        correctAnswer: action.payload
      };
    default:
      return state;
  }
}
