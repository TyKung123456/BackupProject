var currentQuestion = {};
var score = 0,
  playing = true,
  appStarted = false;
var totalQuestions = 0;
var uid = ''; // เพิ่มตัวแปร uid

var questions = [{
    multipleAnswers: false,
    question: "What is C language?",
    choice1: "A programming language used for creating software",
    choice2: "A computer hardware",
    choice3: "A type of operating system",
    choice4: "A type of computer virus",
    answer: "A programming language used for creating software",
    
  }, {
    multipleAnswers: false,
    question: "Who created C language?",
    choice1: "Dennis Ritchie",
    choice2: "Bill Gates",
    choice3: "Steve Jobs",
    choice4: "Mark Zuckerberg",
    answer: "Dennis Ritchie",
  }, {
    multipleAnswers: false,
    question: "What is the syntax for declaring a variable in C language?",
    choice1: "int x;",
    choice2: "x = 5;",
    choice3: "float y;",
    choice4: "y = 3.14;",
    answer: "int x;",
   
  },{
  
    multipleAnswers: false,
    question: "What is the difference between an int and a float variable in C language?",
    choice1: "An int stores whole numbers while a float stores decimal numbers",
    choice2: "An int can store larger values than a float",
    choice3: "A float is used for text input while an int is used for numerical input",
    choice4: "There is no difference between an int and a float variable",
    answer: "An int stores whole numbers while a float stores decimal numbers",
},{
  
    multipleAnswers: false,
    question: "What is the syntax for a for loop in C language?",
    choice1: "for (i=0; i<5; i++)",
    choice2: "for i=0 to 5 step 1",
    choice3: "for (i=5; i>=0; i--)",
    choice4: "for i=5 downto 0",
    answer: "for (i=0; i<5; i++)",

},{
  
    multipleAnswers: false,
    question: "What is the purpose of the printf() function in C language?",
    choice1: "To print text to the console",
    choice2: "To get user input from the console",
    choice3: "To declare a new function",
    choice4: "To perform mathematical calculations",
    answer: "To print text to the console",

},{
  
    multipleAnswers: false,
    question: "What is the syntax for an if statement in C language?",
    choice1: "if (x == 5) {}",
    choice2: "if (x = 5) {}",
    choice3: "if (x < 5) {}",
    choice4: "if (x > 5) {}",
    answer: "if (x == 5) {}",

},{
  
    multipleAnswers: false,
    question: "What is the purpose of the scanf() function in C language?",
    choice1: "To get user input from the console",
    choice2: "To print text to the console",
    choice3: "To declare a new function",
    choice4: "To perform mathematical calculations",
    answer: "To get user input from the console",

},{
  
    multipleAnswers: false,
    question:  "What is the syntax for a while loop in C language?",
    choice1: "while (i<5) {}",
    choice2: "while (i>5) {}",
    choice3: "while (i==5) {}",
    choice4: "while (i!=5) {}",
    answer: "while (i<5) {}",
    

},{
  
    multipleAnswers: false,
    question: "What is the purpose of the break statement in C language?",
    choice1: "To end a loop early",
    choice2: "To skip to the next iteration of a loop",
    choice3: "To declare a new function",
    choice4: "To perform mathematical calculations",
    answer: "To end a loop early",
   
 
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
      game_name: "C",
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






