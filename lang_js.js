var currentQuestion = {};
var score = 0,
  playing = true,
  appStarted = false;
var totalQuestions = 0;
var uid = ''; // เพิ่มตัวแปร uid

var questions = [
  {
    multipleAnswers: false,
    question:
      "Which of the following is a correct way to declare a variable in Java?",
    choice1: "int variable = 5;",
    choice2: "variable int = 5;",
    choice3: "variable = 5;",
    choice4: "5 = variable;",
    answer: "int variable = 5;",
  },
  {
    multipleAnswers: false,
    question: "What is the correct way to declare a constant variable in Java?",
    choice1: "const int variable = 5;",
    choice2: "final int variable = 5;",
    choice3: "static int variable = 5;",
    choice4: "const int = 5;",
    answer: "final int variable = 5;",
  },
  {
    multipleAnswers: false,
    question: "What is JavaScript?",
    choice1: "A markup language",
    choice2: "A programming language",
    choice3: "A database language",
    choice4: "An animation language",
    answer: "A programming language",
  },
  {
    multipleAnswers: false,
    question: "Which of the following is a comparison operator in Java?",
    choice1: "+",
    choice2: "=",
    choice3: "==",
    choice4: "*",
    answer: "==",
  },
  {
    multipleAnswers: false,
    question: "Which keyword is used to create a function in JavaScript?",
    choice1: "func",
    choice2: "function",
    choice3: "fun",
    choice4: "fnc",
    answer: "function",
  },
  {
    multipleAnswers: false,
    question:"Which function is used to round a number to the nearest integer in JavaScript?",
    choice1: "ceil()",
    choice2: "floor()",
    choice3: "round()",
    choice4: "abs()",
    answer: "round()",
  },
  {
    multipleAnswers: false,
    question:"Which method is used to sort an array in JavaScript?",
    choice1: "reduce()",
    choice2: "map()",
    choice3: "filter()",
    choice4: "sort()",
    answer: "sort()",
  },
  {
    multipleAnswers: false,
    question:"Which keyword is used to prevent a variable from being reassigned in JavaScript?",
    choice1: "var",
    choice2: "let",
    choice3: "const",
    choice4: "none of the above",
    answer: "const",
  },
  {
    multipleAnswers: false,
    question:"What is the difference between null and undefined in JavaScript?",
    choice1: "They are the same",
    choice2: "null is an object and undefined is a type",
    choice3: "null is a type and undefined is an object",
    choice4: "null represents a deliberate non-value and undefined represents an uninitialized value",
    answer: "They are the same",
  },
  {
    multipleAnswers: false,
    question:"What is the purpose of the 'bind' method in JavaScript?",
    choice1: "To create a new function with a specific 'this' value",
    choice2: "To create a new object from an existing object",
    choice3: "To add an event listener to an element",
    choice4: "To create a new array from an existing array",
    answer: "To create a new function with a specific 'this' value",
  },
];

var savedQuestions = questions.slice();

var shuffleArray = function (array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var cleanHTMLString = function (str) {
  str = str.split("");
  for (var x = 0; x < str.length; x++) {
    if (str[x] == "<") {
      str[x] = "&lt;"
    } else if (str[x] == ">") {
      str[x] = "&gt;"
    }
  }
  str = str.join("");
  return str;
};


var createEasyEl = function (elType, clsNames) {
  var ee = document.createElement(elType);
  if (Array.isArray(clsNames)) {
    for (var x = 0; x < clsNames.length; x++) {
      ee.classList.add(clsNames[x]);
    }
  } else if (typeof clsNames == "string") {
    ee.classList.add(clsNames);
  }
  return ee;
};

var listenForUserChoice = function (e) {
  if (playing) {
    if (e.target.classList.contains("chosen")) {
      e.target.classList.remove("chosen")
    } else if (e.target.classList.contains("choice")) {
      if (!currentQuestion.multipleAnswers) {
        var choiceEls = document.querySelectorAll(".choice");
        for (var x = 0; x < choiceEls.length; x++) {
          if (choiceEls[x].classList.contains("chosen")) {
            choiceEls[x].classList.remove("chosen");
          }
        }
        e.target.classList.add("chosen");
      }
    }
  } else {
    if (!document.querySelector("#main-btn").classList.contains("wiggle")) {
      document.querySelector("#main-btn").classList.add("wiggle");
      setTimeout(function () {
        document.querySelector("#main-btn").classList.remove("wiggle");
      }, 500);
    }
  }
};

var saveScore = async function (uid, score) {
  var result = await fetch("./updateScore.php", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: uid,
      game_name: "JAVASCRIPT",
      score: score
    })
  })
  var text = await result.text();
  console.log(text);
};


var testUserSubmit = function () {
  if (playing && document.body.contains(document.querySelector(".chosen"))) {
    playing = false;

    if (!currentQuestion.multipleAnswers) {
      var choice = "";
      choice = document.querySelector(".chosen").innerHTML;

      if (choice == cleanHTMLString(currentQuestion.answer)) {
        document.querySelector(".question-feedback").innerHTML = "Correct! <br>";
        document.querySelector(".question-feedback").classList.add("question-right");
        score++;
      } else {
        document.querySelector(".question-feedback").innerHTML = "Sorry, incorrect <br>";
        document.querySelector(".question-feedback").classList.add("question-wrong");
        if (score > 0) {
          score;
        }
      }
      document.querySelector('#feedback').scrollIntoView();
      document.querySelector("#score-holder").innerHTML = score;

      document.querySelector(".question-feedback").innerHTML += cleanHTMLString(currentQuestion.answerExplained);

      // Update the hidden input field value
      document.querySelector("#score-input").value = score;

      // Submit the form
      document.querySelector("#score-form").submit();

      document.querySelector("#main-btn").innerHTML = "Next Question";
    }
  } else if (playing && !(document.body.contains(document.querySelector(".chosen")))) {
    if (!document.querySelector(".question-container-choices").classList.contains("wiggle")) {
      document.querySelector(".question-container-choices").classList.add("wiggle");
      setTimeout(function () {
        document.querySelector(".question-container-choices").classList.remove("wiggle");
      }, 500);
    }
  } else if (!playing) {
    questions.shift();
    startNewQuestion();
  }
};



var createQuestion = function (obj) {
  var question,
    feedback,
    choices;
  playing = true;
  document.querySelector('#score-holder').scrollIntoView();
  
  document.querySelector("#main-btn").innerHTML = "Submit Answer";
  
  document.querySelector("#question-container").innerHTML = "";
  question = createEasyEl("p", "question-container-question");
  question.innerHTML = cleanHTMLString(obj.question);
  document.querySelector("#question-container").appendChild(question);

  feedback = createEasyEl("div", "question-feedback");
  feedback.id = "feedback";
  document.querySelector("#question-container").appendChild(feedback);

  choices = createEasyEl("ol", "question-container-choices");
  for (var x = 0; x < 4; x++) {
    var answerEl = createEasyEl("li", "choice");
    var current = "choice" + (x + 1);
    if (obj[current] != "") {
      answerEl.innerHTML = cleanHTMLString(obj[current]);
      choices.appendChild(answerEl);
    }
  }
  choices.addEventListener("click", this.listenForUserChoice, false);
  document.querySelector("#question-container").appendChild(choices);
};

var startNewQuestion = async function () {
  if (questions.length > 0) {
    currentQuestion = questions[0];
    createQuestion(currentQuestion);
    totalQuestions++; // เพิ่มค่า totalQuestions
    document.querySelector("#total-questions-holder").innerHTML = totalQuestions; // อัปเดตค่า totalQuestions
  } else {
    var el = this.createEasyEl("p", "question-container-question");
    el.innerHTML = "You finished!<br>Your score is " + score + '/' + totalQuestions;
    document.querySelector("#question-container").innerHTML = "";
    document.querySelector("#question-container").appendChild(el);
    document.querySelector("#main-btn").addEventListener("click", start, false);
    document.querySelector("#main-btn").innerHTML = "Restart";

    var user_id = document.querySelector("#user_id").value;
    console.log(user_id);
    console.log(score);
    await saveScore(user_id, score);
  }


};

var start = async function () {
  score = 0;
  totalQuestions = 0; // รีเซ็ตค่า totalQuestions เมื่อเริ่มใหม่
  document.querySelector("#score-holder").innerHTML = score;
  questions = savedQuestions.slice();
  document.querySelector("#main-btn").removeEventListener("click", start, false);
  questions = shuffleArray(questions);
  document.querySelector("#main-btn").addEventListener("click", testUserSubmit, false);
  await startNewQuestion();
};

document.querySelector("#main-btn").addEventListener("click", start, false);






