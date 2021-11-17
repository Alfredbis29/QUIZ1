const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 10 + 4?',
    answers: [
      { text: '14', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is Alfred Bisimwa?',
    answers: [
      { text: 'Web dev ', correct: true },
      { text: 'Musician', correct: true },
      { text: 'Dev Ed', correct: false },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
  question: 'Who is Odila?',
  answers:[
    { text: 'Alfred Mother ', correct: true },
    { text: ' alfred Friend', correct: false },
    { text: 'Dev Ed', correct: false },
    { text: 'african woman', correct: false }
  ]
},
{
  question: 'What is my fav sport ?',
  answers: [
    { text: 'Soccer', correct: true},
    { text: 'Basketball', correct:true },
    { text: 'Running', correct: true },
    { text: 'Tennis', correct: false }
  ]
  },
  {
  question: 'What is my age ?',
  answers: [
    { text: '18 ', correct: false },
    { text: '67', correct: false },
    { text: '22', correct: true },
    { text: '45', correct: false }
  ]
},
  {
    question: 'What is 2 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '4', correct: true }
    ]
  }
]