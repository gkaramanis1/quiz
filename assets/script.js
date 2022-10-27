const homeEl = document.querySelector("#home");
const startQuizEl = document.querySelector("#startQuiz");

const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");

const enterScoreEl = document.querySelector("#enterScore");
const initials = document.querySelector("#initials");
const submitInitialsEl = document.querySelector("#submitInitials");
const userScoreEl = document.querySelector("#score");

const hScoresEl = document.querySelector("highScores");
const playerScoresEl = document.querySelector("#playerScores");
const goBackEl = document.querySelector("#goBack");
const clearScoresEl = document.querySelector("#clearScores");

const viewScores = document.querySelector("#viewScores");
const timerEl = document.querySelector("#timer");
var score= 0;
var currentQuestion = 0;
var highScores = [];
var interval;
var timeLeft = 75;
var seconds = 0;

var questions = [
    {
        title:"What is CSS used for?",
        choices:["Structure","Organize Content","Styling","None of the Above"],
        answer: "Styling"
    },
    {
        title:"What can be used to name a variable?",
        choices:["var","let","const","All of the Above"],
        answer: "All of the Above"
    },
    {
        title:"When a variable is declared within a function it is a...",
        choices:["Local scope","Global scope", "Small scope", "Big scope"],
        answer: "local scope"
    },
    {
        title:"What tag is used to link javascript file to the HTML file?",
        choices:["<script>", "<link>", "<header>", "<body>"],
        answer: "<script>"
    },
    {
        title:"Which data type is used to create true or false statements?",
        choices:["string", "number", "null", "boolean"],
        answer: "boolean"
    }
]

// Timer
function countdown() {
    timerEl.textContent = timeLeft;
        timeInterval = setInterval(function () {
        seconds++;
        timerEl.textContent = timeLeft - seconds;

        if (seconds >= timeLeft) {
            currentQuestion = questions.length;
            nextQuestion();
        }
    }, 1000);
}
// This is to stop the timer
function stopTimer() {
    clearInterval(timeInterval);
}
// This will show the next question after removing the current one
function nextQuestion() {
    currentQuestion++  
    if (currentQuestion < questions.length) {
        renderQuestion();

// This will show the text box to enter your score and stop the timer after the last question has been answered
    } else {
        stopTimer();
        if ((timeLeft - seconds) > 0)
        score += (timeLeft - seconds);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(enterScoreEl);
        timerEl.textContent = 0
    }
}

//This will check for the correct answer and if it is wrong it will subtract 10 seconds from the timer
function checkAnswer(answer) {
    if (questions[currentQuestion].answer == questions[currentQuestion].choices[answer.id]) {
        score += 5;
        displayMessage("Correct!");
    } else {
        seconds += 10;
        displayMessage("Wrong!");
    }

}

// This will display the message for 1 second
function displayMessage(message) {
    let messageOne = document.createElement("one");
    let messageTwo = document.createElement("two");
    messageTwo.textContent = message;
    document.querySelector(".block").appendChild(messageOne);
    document.querySelector(".block").appendChild(messageTwo);
    setTimeout(function () {
        messageOne.remove();
        messageTwo.remove();
    }, 1000)
}

function hide(el) {
    el.style.display = "none";
}

function show(el) {
    el.style.display = "block";
}

//This resets the variables
function change() {
    score = 0;
    currentQuestion = 0;
    seconds = 0;
    timerEl.textContent = 0;
}

// This will load the current question
function renderQuestion() {
    questionEl.textContent = questions[currentQuestion].title;
    for(i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQuestion].choices[i]}`;
    }
}

function loadHighScores() {
    playerScoresEl.innerHTML = "";
    show(hScoresEl);
    highScores = JSON.parse(localStorage.getItem("playerScores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreNumber = document.createElement("number");
        scoreNumber.className += "sNumber";
        console.log(scoreNumber)
        scoreNumber.setAttribute("style", "background-color:Blue;");
        scoreNumber.textContent - `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        playerScoresEl.appendChild(scoreNumber);
    }
}

//.addEventListener()
startQuizEl.addEventListener("click", function () {
    countdown();
    hide(homeEl);
    show(quizEl);
    renderQuestion();
});

answersEl.addEventListener("click", function (element) {
    if (element.target.matches("button")) {
        checkAnswer(element.target);
        nextQuestion();
    }
});

viewScores.addEventListener("click", function () {
    hide(homeEl);
    hide(enterScoreEl);
    hide(quizEl);
    loadHighScores();
    stopTimer();
    change();
});

goBackEl.addEventListener("click", function () {
    hide(hScoresEl);
    show(homeEl);
});

clearScoresEl.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("playerScores", JSON.stringify(highScores));
    loadHighScores();
});

submitInitialsEl.addEventListener("click", function () {
    let initialValue = initials.value.trim();
    if (initialValue) {
        let userScore = { username: initialValue, userScore: score };
        initials.value = '';
        highScores = JSON.parse(localStorage.getItem("playerScores")) || [];
        highScores.push(userScore)
        localStorage.setItem("playerScores", JSON.stringify(highScores));
        hide(enterScoreEl);
        loadHighScores();
        change();
    }
});

