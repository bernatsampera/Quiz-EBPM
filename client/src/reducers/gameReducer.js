import {
  GET_QUESTIONS,
  GET_ANSWERS,
  GET_CORRECT_ANSWER,
  SET_QUESTION_SELECTED,
  ADD_SCORE,
  SET_ROOM,
  END_GAME
} from "../actions/types";

const initialState = {
  questions: [],
  answers: [],
  correctAnswer: {},
  questionSelected: {},
  score: 0,
  room: []
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
              ],
        answers: []
      };
    case ADD_SCORE:
      return {
        ...state,
        score: state.score + action.payload
      };
    case SET_ROOM:
      return {
        ...state,
        room: action.payload
      };
    case END_GAME:
      return {
        ...state,
        questions: [],
        answers: [],
        correctAnswer: {},
        questionSelected: {},
        score: 0,
        room: []
      };
    default:
      return state;
  }
}
