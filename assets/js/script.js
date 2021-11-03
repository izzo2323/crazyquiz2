var startPageEl = document.getElementById("start-page");
var qaPageEl = document.getElementById("qa-page");
var resultsEl = document.getElementById("results");
var startButtonEl = document.getElementById("start-btn");
var submitButtonEl = document.getElementById("submit-btn");
var timerEl = document.getElementById("time");
var initialsEl = document.querySelector("#initials");
var resultsDivEl = document.getElementById("results");
var saveScoreEl = document.getElementById("submit-btn");
var playerScoreEl = document.getElementById("player-score");

var clock = 30;
var currentQuestionIndex = 0;
var playerScore = 0;
var timeInt;
var quizList = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "When retrieving data from a class attribute which character is used before the class name?",
    choices: ["`", "#", ".", "'"],
    answer: ".",
  },
  {
    question:
      "When retrieving data from an ID attribute which character is used before the ID name?",
    choices: ["`", "#", ".", "'"],
    answer: "#",
  },
  {
    question:
      "When trying to loop through data what kind of loop should be used?",
    choices: ["let", "var", "function", "for"],
    answer: "for",
  },
];

function startGame() {
  startPageEl.setAttribute("class", "hide");
  qaPageEl.setAttribute("class", "show");
  timerEl.textContent = clock;
  timeInt = setInterval(countDown, 1000);
  displayQa();
}

function countDown() {
  clock--;
  timerEl.textContent = clock;
  if (clock <= 0) {
    //Stop timer at 0
    clearInterval(timeInt);
    //End the quiz
    gameOver();
  }
}

function displayQa() {
  var currentQuestion = quizList[currentQuestionIndex];

  console.log(currentQuestion);

  var questionEl = document.getElementById("display-question");
  questionEl.textContent = currentQuestion.question;

  //Button 1
  var answerEl = document.getElementById("answer-1");
  answerEl.textContent = currentQuestion.choices[0];
  answerEl.value = currentQuestion.choices[0];
  answerEl.onclick = validate;
  console.log(answerEl);

  //Button 2
  var answerEl = document.getElementById("answer-2");
  answerEl.textContent = currentQuestion.choices[1];
  answerEl.value = currentQuestion.choices[1];
  answerEl.onclick = validate;
  console.log(answerEl);

  //Button 3
  var answerEl = document.getElementById("answer-3");
  answerEl.textContent = currentQuestion.choices[2];
  answerEl.value = currentQuestion.choices[2];
  answerEl.onclick = validate;
  console.log(answerEl);

  //Button 4
  var answerEl = document.getElementById("answer-4");
  answerEl.textContent = currentQuestion.choices[3];
  answerEl.value = currentQuestion.choices[3];
  answerEl.onclick = validate;
  console.log(answerEl);
}

function validate() {
  console.log(this.value);
  if (this.value === quizList[currentQuestionIndex].answer) {
    playerScore = playerScore + 5;
  } else {
    clock = clock - 10;
  }
  console.log(playerScore);
  //Move to next Question
  currentQuestionIndex++;
  // Display next question or end quiz if none left
  if (currentQuestionIndex === quizList.length) {
    gameOver();
  } else {
    displayQa();
  }
  // export { playerScore }
}

//link to High Scores page when quiz is over
function gameOver() {
  //stop clock
  clearInterval(timeInt);
  //End screen visible
  resultsDivEl.removeAttribute("class");
  //hide the display
  qaPageEl.setAttribute("class", "hide");
  //displaying the final score
  playerScoreEl.textContent = playerScore;
}

function saveHighscore() {
  //save score in local storage
  // get value of input box
  var initialInput = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initialInput !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("player-score")) || [];

    // format new score object for current user
    var newScore = {
      score: playerScore,
      initials: initialInput,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("player-score", JSON.stringify(highscores));

    window.location.href = "./scores.html";
  }
}
// export function validate();

startButtonEl.onclick = startGame;
saveScoreEl.onclick = saveHighscore;
