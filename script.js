const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-size", correct: false },
      { text: "font-size", correct: true },
      { text: "text-style", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Syntax", correct: false },
    ],
  },
  {
  question: "Inside which HTML element do we put JavaScript?",
  answers: [
    { text: "&lt;js&gt;", correct: false },
    { text: "&lt;script&gt;", correct: true },
    { text: "&lt;scripting&gt;", correct: false },
    { text: "&lt;javascript&gt;", correct: false },
  ],
},
  {
    question: "In JavaScript, which two keywords were introduced in ES6 to declare a variable with **block scope**?",
    answers: [
      {text: "Scope and block", correct: false },
      {text: "let and const", correct: true },
      {text: "var and let", correct: false },
      {text: "script and var", correct: false },
    ],
  },
  {
    question: "The CSS **Box Model** components, from the element's content outwards to other elements, follow which sequence?",
    answers: [
      {text: "Content, Padding, Border, Margin", correct: true },
      {text: "Margin, Border, Padding, Content", correct: false },
      {text: "Padding, Content, Border, Margin", correct: false },
      {text: "Housing, Content, Padding, Margin", correct: false}
    ],
    },
    {
      question: "When developing a **RESTful API**, which standard HTTP method is typically mapped to the **Update** operation in CRUD?",
      answers: [
      {text: "POST", correct: false },
      {text: "GET", correct: false },
      {text: "PUT (or PATCH)", correct: true },
      {text: "DELETE", correct: false},
      ]
    }
    ];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎯`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
