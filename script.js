// DOM Elements
const loginScreen = document.getElementById("login-screen");
const quizScreen = document.getElementById("quiz-screen");
const usernameInput = document.getElementById("username");
const startBtn = document.getElementById("start-btn");
const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn"); // Retry Button
const scoreElem = document.getElementById("score");

// Variables
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Load Questions from JSON
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
  });

// Start Quiz
startBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    loginScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
  }
});

// Load Question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElem.textContent = currentQuestion.question;
  optionsElem.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, index));
    optionsElem.appendChild(button);
  });

  nextBtn.classList.add("hidden"); // Hide Next button until answer selected
  retryBtn.classList.add("hidden"); // Hide Retry button if shown
}

// inahandle Answer Selection
function selectAnswer(button, selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;

  // Highlight correct and incorrect answers
  const optionButtons = Array.from(optionsElem.children);
  optionButtons.forEach((btn, idx) => {
    if (idx === correctIndex) {
      btn.style.backgroundColor = "green"; // Highlight correct answer
    } else {
      btn.style.backgroundColor = "red"; // Highlight incorrect answers
    }
    btn.disabled = true; // Disable all buttons after selection
  });

  // Update score if answer is correct
  if (selectedIndex === correctIndex) {
    score++;
    scoreElem.textContent = `Score: ${score}`;
  }

  nextBtn.classList.remove("hidden"); // Show Next button after selecting an answer
}

// Move to Next Question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

// End Quiz
function endQuiz() {
  questionElem.textContent = `Quiz Over! Final Score: ${score}`;
  optionsElem.innerHTML = "";
  nextBtn.classList.add("hidden");
  retryBtn.classList.remove("hidden"); // Show Retry button
}

// Retry Quiz
retryBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreElem.textContent = `Score: ${score}`;
  loadQuestion();
});
