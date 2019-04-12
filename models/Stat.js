const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = Stat = mongoose.model("stats", StatSchema);
