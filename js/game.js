// A JS memory game using some jQuery. 

// Test jQuery integration.
$("h1").css("color", "pink");

// Return a random number in the range min to max (inclusive of min and max).
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextSequence() {
    const randNo = randomNumber(0,3);
}