const express = require("express");
const router = express.Router();

// Load Question model
const Question = require("../../models/Question");
// Load Answer model
const Answer = require("../../models/Answer");
// Load Stat model
const Stat = require("../../models/Stat");

// @route   Get api/game/question
// @desc    Retrieves all questions
// @access  Public
router.get("/question", (req, res) => {
  Question.find()
    .then(async questions => {
      // const requests = questions.map(async question => {
      //   await Answer.findById(question.correctAnswer).then(async answer => {
      //     question.correctAnswer = answer;
      //   });

      //   await question.answers.map(async (answerId, index) => {
      //     await Answer.findById(answerId).then(async answer => {
      //       console.log(answer.text);

      //       question.answers[index] = answer;
      //     });
      //   });
      // });

      // Promise.all(requests).then(() => {
      //   console.log("here");
      //   setTimeout(() => {
      //     res.json(questions);
      //   }, 1000);
      // });

      res.json(questions);
    })
    .catch(err => console.log(err));
});

// @route   Post api/game/question
// @desc    Adds question
// @access  Public
router.post("/question", (req, res) => {
  const wrongAnswers = req.body.wronganswers.map(ans => {
    const answer = new Answer({ text: ans.text });
    answer.save();
    return answer;
  });

  const correctAnswer = new Answer({
    text: req.body.correctanswer
  });
  correctAnswer.save();

  const question = new Question({
    text: req.body.text,
    answers: [...wrongAnswers, correctAnswer],
    correctAnswer
  });

  question
    .save()
    .then(question => res.json(question))
    .catch(err => console.log(err));
});

// @route   get api/game/answers
// @desc    Gets answers
// @access  Public
router.get("/answers", (req, res) => {
  const answers = req.query.answers.split(",");

  const request = answers.map(async (answerId, index) => {
    await Answer.findById(answerId).then(answer => {
      answers[index] = answer;
    });
  });

  Promise.all(request).then(() => {
    res.json(answers);
  });
});

// @route   get api/game/correctanswer
// @desc    Gets correctanswer
// @access  Public
router.get("/correctanswer", (req, res) => {
  const { correctanswer } = req.query;
  Answer.findById(correctanswer)
    .then(answer => {
      res.json(answer);
    })
    .catch(err => console.log(err));
});

// @route   get api/game/stat
// @desc    Gets stat
// @access  Public
router.get("/stat", (req, res) => {
  Stat.find()
    .then(stats => res.json(stats))
    .catch(err => console.log(err));
});

// @route   post api/game/stat
// @desc    post stat
// @access  Public
router.post("/stat", (req, res) => {
  const score = req.body.score;
  const user = req.body.user;

  console.log(user);

  const stat = new Stat({
    user,
    score
  });

  stat
    .save()
    .then(res.json(stat))
    .catch(err => console.log(err));
});

module.exports = router;
