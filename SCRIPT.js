//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "Javascript is an _______ language?",
    options: ["Object-oriented", "object-based", "procedural", "None of above"],
    correct: "object-oriented",
  },
  
  {
    id: "1",
    question: " Which of the following keywords is used to define a variable in Javascript",
    options: ["var", "let", "Both A and B", "None of above"],
    correct: "both A and B",
  },
  {
  id: "2",
    question: "  Which of the following methods is used to access HTML elements using Javascript?",
    options: ["getElementById()", "getElementBYclassName()", "None of these", "both A and B" ],
    correct: "Both A and B",
  },
  { id : "3" ,
  question: " Upon encountering empty statements, what does the Javascript Interpreter do?",
  options: ["Throws an error", "Ignores the statement", "gives a warning", "None of above" ],
  correct: "Ignores the statement",
 }
 ,
 { 
  id : "4" ,
   question: " Which of the following methods can be used to display data in some form using Javascript?",
  options: ["Document.write", "console.log()", "window.alert()", "all of above" ],
  correct: "all of above",
 },
{
id : "5" ,
   question: " How can a datatype be declared to be a constant type?",
  options: ["Const", "var", "let", "constant" ],
  correct: "Const",
 },
 {
  id : "6" ,
     question: "    When the switch statement matches the expression with the given labels, how is the comparison done?",
    options: ["both the datatype and the result of the expression are compared", "14", "only the value of the expration are compair", "all of above" ],
    correct: "both the datatype and the result of the expression are compared",
   },
   {
   id : "7" ,
     question: "What keyword is used to check whether a given property is valid or not?",
     options: ["in", "is in", "exists", "all of above" ],
    correct: "in",
   },
   {
    id : "8" ,
      question: " What is the use of the <noscript> tag in Javascript?",
      options: ["The contents are displayed by non-js browsers", "clears all cookies and cache.", "None of above", "Both A and B " ],
     correct: "The contents are displayed by non-js browsers",
    },
    {
      id : "9" ,
        question: " When an operators value is NULL, the typeof returned by the unary operator is:",
        options: ["Boolean", "Undefined.", "Object", "Integer " ],
       correct: "Object",
      },

];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your result is "+ scoreCount + " out of " + questionCount;
        

    } else {
      //display questionCount 
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }

  })
);



//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};