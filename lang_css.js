var currentQuestion = {};
var score = 0,
  playing = true,
  appStarted = false;
var totalQuestions = 0;

var questions = [{
    multipleAnswers: false,
    question: "What does CSS stand for?",
    choice1: "Cascading Style Sheets",
    choice2: "Creative Style Sheets",
    choice3: "Computer Style Sheets",
    choice4: "Cool Style Sheets",
    answer: "Cascading Style Sheets",
    
  }, {
    multipleAnswers: false,
    question: "What property is used to define line thickness in CSS?",
    choice1: "border",
    choice2: "padding",
    choice3: "margin",
    choice4: "width",
    answer: "border",
   
  }, {
    multipleAnswers: false,
    question: "What property is used to define content in CSS?",
    choice1: "display",
    choice2: "position",
    choice3: "float",
    choice4: "clear",
    answer: "display",
   
  },{
  
    multipleAnswers: false,
    question: " What property is used to set the inner borders of table cells in CSS?",
    choice1: "border-top",
    choice2: "border-right",
    choice3: "border-bottom",
    choice4: " border-left",
    answer: " border-left",
},{
  
    multipleAnswers: false,
    question: "What property is used to define text scrolling in CSS?",
    choice1: "overflow",
    choice2: "position",
    choice3: "display",
    choice4: " float",
    answer: "overflow",

},{
  
    multipleAnswers: false,
    question: "Which CSS property is used to create a flexible grid layout?",
    choice1: "display",
    choice2: "grid-template-columns",
    choice3: "flexbox",
    choice4: "grid-column",
    answer: "flexbox",

},{
  
    multipleAnswers: false,
    question: " Which CSS property is used to create a smooth transition effect between different CSS property values?",
    choice1: "transition",
    choice2: "animation",
    choice3: "transform",
    choice4: "visibility",
    answer: "transition",

},{
  
    multipleAnswers: false,
    question: "Which CSS property is used to add shadows to an element?",
    choice1: "box-shadow",
    choice2: "text-shadow",
    choice3: " filter",
    choice4: "blend-mode",
    answer: "box-shadow",

},{
  
    multipleAnswers: false,
    question:  " Which CSS property is used to specify the spacing between lines of text?",
    choice1: "line-height",
    choice2: "font-size",
    choice3: "text-indent",
    choice4: "text-align",
    answer: "line-height",

},{
  
    multipleAnswers: false,
    question: " Which CSS selector is used to select the first child element of its parent?",
    choice1: ":first-child",
    choice2: ":last-child",
    choice3: ":nth-child",
    choice4: ":only-child",
    answer: ":first-child",
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
  
  var startNewQuestion = function () {
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
    }
  
  };
  
  var start = function () {
    score = 0;
    totalQuestions = 0; // รีเซ็ตค่า totalQuestions เมื่อเริ่มใหม่
    document.querySelector("#score-holder").innerHTML = score;
    questions = savedQuestions.slice();
    document.querySelector("#main-btn").removeEventListener("click", start, false);
    questions = shuffleArray(questions);
    document.querySelector("#main-btn").addEventListener("click", testUserSubmit, false);
    startNewQuestion();
  };
  
  
  document.querySelector("#main-btn").addEventListener("click", start, false);