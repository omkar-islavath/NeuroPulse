var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;
var playerTurn = false;

/* ================= START ================= */

$("#start-btn").click(function () {
  if (started) return;
  startGame();
});

$("#restart-btn").click(function () {
  $("#restart-btn").hide();
  startGame();
});

function startGame() {
  started = true;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  playerTurn = false;

  $("#start-btn").hide();
  $("#restart-btn").hide();
  $("#level-title").text("SIMON");
  updateLevelDisplay(0);
  updateStreakBar(0);

  setTimeout(nextSequence, 600);
}

/* ================= BUTTON CLICK ================= */

$(".btn").click(function () {
  if (!started || !playerTurn) return;

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

/* ================= CHECK ANSWER ================= */

function checkAnswer(index) {
  if (gamePattern[index] !== userClickedPattern[index]) {
    gameOver();
    return;
  }

  var progress = (userClickedPattern.length / gamePattern.length) * 100;
  updateStreakBar(progress);

  if (userClickedPattern.length === gamePattern.length) {
    playerTurn = false;
    flashScreen();
    setTimeout(nextSequence, 900);
  }
}

/* ================= NEXT SEQUENCE ================= */

function nextSequence() {
  userClickedPattern = [];
  playerTurn = false;

  level++;
  updateLevelDisplay(level);

  if (level > highScore) {
    highScore = level;
    $("#high-score").text("BEST: " + highScore);
  }

  // Pick one new random colour and add it to the pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash ONLY the new button for this level
  flashButton(randomChosenColour, function () {
    playerTurn = true;
    updateStreakBar(0);
  });
}

/* ================= FLASH ONE BUTTON ================= */

function flashButton(colour, callback) {
  var btn = $("#" + colour);
  btn.addClass("active");
  playSound(colour);

  setTimeout(function () {
    btn.removeClass("active");
    if (callback) callback();
  }, 500);
}

/* ================= GAME OVER ================= */

function gameOver() {
  playerTurn = false;
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 500);

  $("#level-title").text("GAME OVER");
  updateStreakBar(0);

  saveScore(level);

  started = false;
  setTimeout(function () {
    $("#restart-btn").show();
  }, 700);
}

/* ================= UI HELPERS ================= */

function updateLevelDisplay(lvl) {
  $("#level-display").text("LEVEL: " + lvl);
}

function updateStreakBar(pct) {
  $("#streak-fill").css("width", pct + "%");
}

function flashScreen() {
  var el = document.getElementById("round-flash");
  el.classList.add("show");
  setTimeout(function () {
    el.classList.remove("show");
  }, 180);
}

/* ================= ANIMATION ================= */

function animatePress(colour) {
  var btn = $("#" + colour);
  btn.addClass("pressed");
  setTimeout(function () {
    btn.removeClass("pressed");
  }, 120);
}

/* ================= SOUND ================= */

function playSound(name) {
  var audio = new Audio("../sounds/" + name + ".mp3");
  audio.play().catch(function () {});
}

/* ================= SAVE SCORE ================= */

async function saveScore(score) {
  if (typeof getUserId !== "function") return;
  var userId = getUserId();
  if (!userId) return;

  await fetch("/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId, score: score }),
  });
}
