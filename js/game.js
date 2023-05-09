// A JS memory game using some jQuery. Using four colored buttons, a pattern will begin
// to be generated. It will start with one color, then two colours, then three colors,
// etc. As the player continues to correctly replicate the pattern of colors, more and
// more colors will be added (one at a time). The game ends when the player cannot 
// replicate the pattern.

const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

// Return a random number in the range min to max (inclusive of min and max).
function randomNumberGenerate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextSequence() {
    const randomNumber = randomNumberGenerate(0,3);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // Animate the chosen color.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // Play sound associated with the chosen color.
    const soundFile = `./sounds/${randomChosenColor}.mp3`;
    (new Audio(soundFile)).play();
}

nextSequence();