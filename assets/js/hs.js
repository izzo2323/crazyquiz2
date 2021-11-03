// import { playerScore } from './script.js';

// get value of input box
// var initialInput = initialsEl.value.trim();

// // make sure value wasn't empty
// if (initialInput !== "") {
//     // get saved scores from localstorage, or if not any, set to empty array

// format new score object for current user
// var newScore = {
//     score: time,
//     initials: initials
// };

// save to localstorage
// highscores.push(newScore);

function listHighScore() {
  var highscores =
    JSON.parse(window.localStorage.getItem("player-score")) || [];

  // sort highscores by score property in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    // create li tag for each high score
    var list = document.createElement("li");
    list.textContent = score.initials + " - " + score.score;

    // display on page
    var listScore = document.getElementById("player-score");
    listScore.appendChild(list);
  });
}

// run function when page loads

listHighScore();

var restartButtonEl = document.getElementById("restart-btn");

function restart() {
  window.location.href = "index.html";
}

restartButtonEl.onclick = restart;
