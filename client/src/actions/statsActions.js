import axios from "axios";
import { GET_STAT, POST_STAT } from "./types";

export const getStats = () => dispatch => {
  axios
    .get("/api/game/stat")
    .then(stats => console.log(stats))
    .catch(err => console.log(err));
};

export const postStat = stat => dispatch => {
  axios
    .post("/api/game/stat", stat)
    .then(stat => console.log(stat))
    .catch(err => console.log(err));
};
