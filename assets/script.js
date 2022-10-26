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

function stopTimer() {
    clearInterval(timeInterval);
}

startQuizEl.addEventListener("click", function () {
    countdown();
})