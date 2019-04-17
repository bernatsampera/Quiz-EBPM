import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import gameReducer from "./gameReducer";
import statsReducer from "./statsReducer";

export default combineReducers({
  auth: authReducer,
  game: gameReducer,
  errors: errorReducer,
  stats: statsReducer
});
