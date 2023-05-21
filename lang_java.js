var currentQuestion = {};
var score = 0,
  playing = true,
  appStarted = false;
var totalQuestions = 0;
var uid = ''; // เพิ่มตัวแปร uid

var questions = [{
  multipleAnswers: false,
  question: "Which of the following is a correct way to declare a variable in Java?",
  choice1: "int variable = 5;",
  choice2: "variable int = 5;",
  choice3: "variable = 5;",
  choice4: "5 = variable;",
  answer: "int variable = 5;",

}, {
  multipleAnswers: false,
  question: "What is the correct way to declare a constant variable in Java?",
  choice1: "const int variable = 5;",
  choice2: "final int variable = 5;",
  choice3: "static int variable = 5;",
  choice4: "const int = 5;",
  answer: "final int variable = 5;",

}, {
  multipleAnswers: false,
  question: "Which of the following is a comparison operator in Java?",
  choice1: "+",
  choice2: "=",
  choice3: "==",
  choice4: "*",
  answer: "==",

},{
  multipleAnswers: false,
  question: "Which of the following is not a logical operator in Java?",
  choice1: "&&",
  choice2: "||",
  choice3: "!",
  choice4: "=",
  answer: "=",
  
},{
  multipleAnswers: false,
  question: "What is the correct syntax for a for loop in Java?",
  choice1: "for (int i = 0; i < 10; i++)",
  choice2: "for (int i = 0; i < 10; i+)",
  choice3: "for (int i = 0; i < 10; i--)",
  choice4: "for (int i = 10; i > 0; i++)",
  answer: "for (int i = 0; i < 10; i++)",

},{
  multipleAnswers: false,
  question: "What is the correct syntax to create an array in Java?",
  choice1: "int array = {1, 2, 3};",
  choice2: "int[] array = {1, 2, 3};",
  choice3: "array int = {1, 2, 3};",
  choice4: "int array = new int[] {1, 2, 3};",
  answer: "int[] array = {1, 2, 3};",

},{
  multipleAnswers: false,
  question: "What is the difference between a while loop and a for loop in Java?",
  choice1: 'There is no difference between them.',
  choice2: 'A while loop is used when the number of iterations is known, while a for loop is used when the number of iterations is unknown.',
  choice3: 'A for loop is used when the number of iterations is known, while a while loop is used when the number of iterations is unknown.',
  choice4: 'None of the above.',
  answer: 'A for loop is used when the number of iterations is known, while a while loop is used when the number of iterations is unknown.',
  
},{
  multipleAnswers: false,
  question: "What is the difference between a constructor and a method in Java?",
  choice1: 'Both constructors and methods have a return type.',
  choice2: 'A constructor is used to create an object of a class, while a method is used to perform an action on an object.',
  choice3: 'A constructor can be called explicitly, while a method can only be called implicitly.d',
  choice4: 'Constructors and methods are the same thing in Java.',
  answer: 'A constructor is used to create an object of a class, while a method is used to perform an action on an object.',
  
},{
  multipleAnswers: false,
  question: "What is the difference between an abstract class and an interface in Java?",
  choice1: 'An abstract class can have concrete methods, while an interface cannot.',
  choice2: 'An interface can have private methods, while an abstract class cannot.',
  choice3: 'An abstract class can have multiple inheritance, while an interface cannot.',
  choice4: 'An interface can have instance variables, while an abstract class cannot.',
  answer: 'An abstract class can have concrete methods, while an interface cannot.',
  
},{
  multipleAnswers: false,
  question: "What is the purpose of the 'final' keyword in Java?",
  choice1: 'It is used to prevent a variable from being modified.',
  choice2: 'It is used to prevent a class from being subclassed.',
  choice3: 'It is used to prevent a method from being overridden.',
  choice4: 'All of the above.',
  answer: 'All of the above.',

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
      game_name: "JAVA",
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






