const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "answers"
    }
  ],
  correctAnswer: []
});

module.exports = Question = mongoose.model("questions", QuestionSchema);
