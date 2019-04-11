import {
  GET_QUESTIONS,
  GET_ANSWERS,
  GET_CORRECT_ANSWER,
  SET_QUESTION_SELECTED
} from "../actions/types";

const initialState = {
  questions: [],
  answers: [],
  correctAnswer: {},
  questionSelected: {},
  puntuation: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        questionSelected: action.payload[3]
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
    case SET_QUESTION_SELECTED:
      return {
        ...state,
        questionSelected:
          state.questions.indexOf(state.questionSelected) + 1 >=
          state.questions.length
            ? state.questions[0]
            : state.questions[
                state.questions.indexOf(state.questionSelected) + 1
              ]
      };
    default:
      return state;
  }
}
