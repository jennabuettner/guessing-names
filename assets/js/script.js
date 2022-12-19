var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var guessWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

//  arrays to create blanks and letters on screen
var lettersInGuessWord = [];
var blanksLetters= [];

// possible word guesses
var words = ["Jenna","Karla","Jennifer","Kelsey","Kristin","Connie","Rachel","Rebekah"];

// called when game loads
function init() {
    getWins();
    getLosses();
}

// called when start button is clicked
function startGame() {
    isWin = false;
    timerCount = 10;
    startButton.disabled = true;
    renderBlanks();
    startTimer();
}

// called when game is won
function winGame() {
    wordBlank.textContent = "Wooow, amazing. You won. Congrats.";
    winCounter++;
    startButton.disabled = false;
    setWins();
}

// called when timer runs out
function loseGame() {
    wordBlank.textContent = "Game over, bitch. You lose.";
    loseCounter++;
    startButton.disabled = false;
    setLosses();
}

// starts timer at the time of start button being clicked
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }

        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

function renderBlanks() {
    guessWord = words[Math.floor(Math.random() * words.length)];
    lettersInGuessWord = guessWord.split("");
    numBlanks = lettersInGuessWord.length;
    blanksLetters = []
//  loops to push to blankLetters array
    for (var i = 0; i < numBlanks; i++) {
        blanksLetters.push("_");
    }

    // converts blank letters into a string and renders it onto the screen
    wordBlank.textContent = blanksLetters.join(" ");
}

// updates win count on screen sets win count to client storage
function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

// updates lose count on screen and sets lose count to client storage
function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("loseCount", loseCounter);
}

function getWins() {
    var storedWins = localStorage.getItem("winCount");

    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }

    win.textContent = winCounter;
}

function getLosses() {
    var storedLosses = localStorage.getItem("loseCount");

    if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }

    lose.textContent = loseCounter;
}

function checkWin() {
    if (guessWord === blanksLetters.join("")) {
        isWin = true;
    }
}

function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (guessWord[i] === letter) {
            letterInWord = true;
        }
    }
    //  aka if letterInWord = true
    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (guessWord[j] === letter) {
                blanksLetters[j] = letter;
                }
            }
            wordBlank.textContent = blanksLetters.join("");
        }
    }


document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }

    var key = event.key.toLowerCase();
    var alphaNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

    if (alphaNumericCharacters.includes(key)) {
        var letterGuessed = event.key;
        checkLetters(letterGuessed)
        checkWin();
    }
});

startButton.addEventListener("click", startGame);

init();

var resetButton = document.querySelector(".reset-button");

function resetGame() {
    winCounter = 0;
    loseCounter = 0;
    setWins()
    setLosses()
}

resetButton.addEventListener("click", resetGame);