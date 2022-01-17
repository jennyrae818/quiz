// still to dos... 
// stop timer + create pop up window to enter initials at end (window.prompt('Enter your initials', 'initials here');)
// keep track of wins/losses  
// lessen timer by 5 seconds with each wrong answer 


const startButton = document.getElementById('start-btn') // selecting start button from HTML ID tag
const nextButton = document.getElementById('next-btn') 
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question') // this is defining the question
const answerButtonsElement = document.getElementById('answer-buttons') 

let shuffledQuestions, currentQuestionIndex // shuffles questions and which one will be our current questions

const startingMinutes = 1;
let time = startingMinutes *60;

const countdownEl = document.getElementById('timer');


function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds; 
    
    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;

    if (time === -1 || currentQuestionIndex === 5){
      clearInterval(window.timer);
      alert('you are out of time!!!!!');
    }
}

function myStopFunction() {
    clearInterval(interval);
    alert('you are out of time!')
}
// end timer 


startButton.addEventListener('click', startGame) // adding event to start button which we will list instructions for in StartGame Function
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  window.timer = setInterval(updateCountdown, 1000);
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0 // starting on first question
 // startButton.classList.add('hide') // when StartGame is clicked - this hides the startButton
  questionContainerElement.classList.remove('hide') // this then removes the hide from the Questions - causing them to show 
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
    clearInterval(window.timer)
    localStorage.setItem('timeRemaining', time)
    startButton.innerText = 'View High Scores'
    startButton.removeEventListener('click', startGame)
    startButton.addEventListener('click', function (e) {
      window.open('./highscores.html')
    })
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
    time -= 2
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
    
  {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: false },
            { text: "numbers", correct: true }, 
        ]
       
    },
    {    question: "The condition in an if / else statement is enclosed within ____.",
      answers: [
          { text: "quotes", correct: false },
          { text: "curly brackets", correct: false },
          { text: "parentheses", correct: true },
          { text: "square brackets", correct: false },  
      ]
    
  },
  {
      question: "Arrays in JavaScript can be used to store ____.",
      answers: [
          { text: "numbers and strings", correct: false },
          { text: "other arrays", correct: false },
          { text: "booleans", correct: false },
          { text: "all of the above", correct: true },   
      ]
     
  },
  {
      question: "String values must be enclosed within ____ when being assigned to variables.",
      answers: [
          { text: "quotes", correct: true },
          { text: "commas", correct: false },
          { text: "curly brackets", correct: false },
          { text: "parentheses", correct: false }, 
      ]
  },
  {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      answers: [
          { text: "javaScript", correct: false },
          { text: "console.log", correct: true },
          { text: "terminal / bash", correct: false },
          { text: "for loops", correct: false },   
      ]
  }
  ];
  






/*


  const timerElement = document.getElementById('timerDisplay');
  let timer;

  function startTimeCountDown() {
      timer = 60;
      const timeCountdown = setInterval(countdown, 1000);
  }


  function countdown() {
      if (timer == 0) {
          clearTimeout(timer);
          timerElement.innerHTML = 'Start'

      } else {
          timerElement.innerHTML = timer + ' secs';
          timer--;
      }
  }

  timerElement.addEventListener('click', ev => {
      startTimeCountDown();
  }); */