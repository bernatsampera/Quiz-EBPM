import { GET_STAT } from "../actions/types";

const initialState = {
  stats: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STAT:
      return {
        ...state,
        scores: action.payloa
      };
    default:
      return state;
  }
}
