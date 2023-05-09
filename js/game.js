// A JS memory game using some jQuery. Using four colored buttons, a pattern will begin
// to be generated. It will start with one color, then two colours, then three colors,
// etc. As the player continues to correctly replicate the pattern of colors, more and
// more colors will be added (one at a time). The game ends when the player cannot 
// replicate the pattern.

const buttonColors = ["red", "blue", "green", "yellow"];
let computerPattern = [];
let userPattern = [];
let gameStarted = false;
let gameLevel = 0;

// Press "s" to start the game. Listening on entire page for a keypress using jQuery.
$(document).on("keydown", (event) => {
    if (event.code === "KeyS" && event.key === "s") {
        if (gameStarted === false) {
            computerNextSequence();
            gameStarted = true;
        }
    }
});

// Listen for player clicks on all buttons (ie: listen on all btn classes).
// Note: cannot use arrow function as we need to access "this".
$(".btn").click(function () {
    // The IDs of the buttons are their colors.
    const userChosenColor = $(this).attr("id");
    // Store the chosen color in the player's pattern array.
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateButton(userChosenColor);

    checkAnswer(userPattern.length-1);
});

// Check if the computer and user patterns match.
function checkAnswer(currLevel) {
    if (userPattern[currLevel] === computerPattern[currLevel]) {
        if (userPattern.length === computerPattern.length) {
            setTimeout(function () { computerNextSequence(); }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over!<br><br>Press \"s\"to play again.");
        setTimeout(function () { $("body").removeClass("game-over"); }, 200);
        startOver();
    }
}

// Computer adding another pattern to the sequence.
function computerNextSequence() {
    userPattern = [];
    gameLevel++;
    $("#level-title").text(`Level ${gameLevel}`);
    // Computer is randomly selecting a color to add to the pattern.
    const randomNumber = randomNumberGenerate(0, 3);
    const randomChosenColor = buttonColors[randomNumber];
    // Store the chosen color in the computer's pattern array.
    computerPattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Animate a particular colored button using jQuery.
function animateButton(col) {
    $("#" + col).addClass("pressed");
    setTimeout(function () {
        $("#"+col).removeClass("pressed");
    }, 100);
}

// Play sound associated with particular color.
function playSound(col) {
    const soundFile = `./sounds/${col}.mp3`;
    (new Audio(soundFile)).play();
}

// Return a random number in the range min to max (inclusive of min and max).
function randomNumberGenerate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startOver() {
    gameLevel = 0;
    computerPattern = [];
    gameStarted = false;
}