var currentQuestion = {};
var score = 0,
  playing = true,
  appStarted = false;
var totalQuestions = 0;
var uid = ''; // เพิ่มตัวแปร uid

var questions = [{
  multipleAnswers: false,
  question: "What is Python?",
  choice1: "A type of snake",
  choice2: "A high-level programming language",
  choice3: "A type of fruit",
  answer: "A high-level programming language",
}, {
  multipleAnswers: false,
  question: "What is the keyword used to define a function in Python?",
  choice1: "func",
  choice2: "define",
  choice3: "def",
  choice4: "",
  answer: "def",
}, {
  multipleAnswers: false,
  question: "What does the following code print? print(2 + 3 * 4)",
  choice1: "20",
  choice2: "14",
  choice3: "23",
  choice4: "",
  answer: "14",
},{
  multipleAnswers: false,
  question: "Which of the following is not a Python data type?",
  choice1: "int",
  choice2: "str",
  choice3: "bool",
  choice4: "array",
  answer: "array",
},{
  multipleAnswers: false,
  question: "What is the result of the following expression? 5 * 3 - 2 + 4 / 2",
  choice1: "10",
  choice2: "13",
  choice3: "15",
  choice4: "",
  answer: "13",
},{
  multipleAnswers: false,
  question: "How do you define a list in Python?",
  choice1: "Using curly braces {}",
  choice2: "Using square brackets []",
  choice3: "Using parentheses ()",
  choice4: "",
  answer: "Using square brackets []",
},{
  multipleAnswers: false,
  question: "What is the keyword used to exit a loop in Python?",
  choice1: 'break',
  choice2: 'exit',
  choice3: 'stop',
  choice4: '',
  answer: 'break',
},{
  multipleAnswers: false,
  question: "Which of the following is a valid way to read input from a user in Python?",
  choice1: 'input()',
  choice2: 'get_input()',
  choice3: 'read_input()',
  choice4: '',
  answer: 'input()',
},{
  multipleAnswers: false,
  question: "What is the correct way to declare a variable in Python?",
  choice1: 'variable = "value"',
  choice2: '"value" = variable',
  choice3: 'var "value"',
  choice4: '',
  answer: 'variable = "value"',
},{
  multipleAnswers: false,
  question: "What is the keyword used to check if a value is in a list in Python?",
  choice1: 'check',
  choice2: 'contains',
  choice3: 'in',
  choice4: '',
  answer: 'in',
},{

}];

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
      game_name: "PYTHON",
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






