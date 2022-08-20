const { log } = require("util");
const readline = require("readline");
const questions = [
  "what is your name? ",
  "where do you live? ",
  "what are you going to do with node js? ",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const collectAnswers = (question, done) => {
  const answers = [];
  const [firstQuestion] = questions;

  const answerQuestion = (answer) => {
    answers.push(answer);
    if (answers.length < questions.length) {
      rl.question(questions[answers.length], answerQuestion);
    } else {
      done(answers);
    }
  };

  rl.question(firstQuestion, answerQuestion);
};

collectAnswers(questions, (answers) => {
  log("Thank you for your answers. ");
  log(answers);
  process.exit();
});
