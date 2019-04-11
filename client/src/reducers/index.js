import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import gameReducer from "./gameReducer";

export default combineReducers({
  auth: authReducer,
  game: gameReducer,
  errors: errorReducer
});
