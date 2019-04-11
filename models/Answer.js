const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnswerSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

module.exports = Answer = mongoose.model("answers", AnswerSchema);
