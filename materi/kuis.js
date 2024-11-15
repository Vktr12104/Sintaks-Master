const question = [
  {
    question:
      "Jika Nilai A=10 dan Resitivitas=1.5 serta nilai panjang adalah 3, berapa besar resisitivtas",
    answer: [
      {
        text: "0.5",
        correct: false,
      },
      {
        text: "0.45",
        correct: true,
      },
      {
        text: "0.6",
        correct: false,
      },
      {
        text: "0.3",
        correct: false,
      },
    ],
  },
  {
    question: "Apa hubungan antara hambatan dengan luas area",
    answer: [
      {
        text: "Berbanding terbalik",
        correct: true,
      },
      {
        text: "Berbanding lurus",
        correct: false,
      },
      {
        text: "Tidak berbanding sama sekali",
        correct: false,
      },
      {
        text: "Semua hal tidak dapat diperbandingkan",
        correct: false,
      },
    ],
  },
  {
    question:
      "Jika Nilai A=9 dan Besar Hambatan=2 serta nilai panjang adalah 3, berapa besar Resistivas...",
    answer: [
      {
        text: "6",
        correct: true,
      },
      {
        text: "5",
        correct: false,
      },
      {
        text: "7",
        correct: false,
      },
      {
        text: "6.5",
        correct: false,
      },
    ],
  },
  {
    question: "Apa hubungan antara besar Resistivitas dengan Panjang",
    answer: [
      {
        text: "Berbanding lurus",
        correct: true,
      },
      {
        text: "Berbanding terbalik",
        correct: false,
      },
      {
        text: "Tidak berbanding sama sekali",
        correct: false,
      },
      {
        text: "Tidak ada yang dapat diperbandingkan",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let scoreElement = document.getElementById("score");
let score = 0;
const userEmail = sessionStorage.getItem("userEmail");
let storedScore = localStorage.getItem(userEmail + "-score");
if (storedScore !== null && !isNaN(storedScore)) {
  score = parseInt(storedScore);
} else {
  score = 0;
}

function startQuiz() {
  currentQuestionIndex = 0;
  scoreElement.textContent = score;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  answerButtons.innerHTML = "";
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn1");
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
    console.log(score);
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  localStorage.setItem(userEmail + "-score", score);
  scoreElement.textContent = score;
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${question.length}!`;
  document.getElementById("score").innerText = score;

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
