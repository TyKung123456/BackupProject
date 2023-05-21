var currentQuestion = {};
var score = 0,
  playing = true,
  appStarted = false;
var totalQuestions = 0;
var uid = ''; // เพิ่มตัวแปร uid

var questions = [{
  multipleAnswers: false,
  question: "What does HTML stand for?",
  choice1: "Hyper Text Markup Language",
  choice2: "Home Tool Markup Language",
  choice3: "Hot Text Markup Language",
  choice4: "High Text Markup Language",
  answer: "Hyper Text Markup Language",
  
}, {
  multipleAnswers: false,
  question: "What is used to open a tag in HTML?",
  choice1: "[",
  choice2: "/",
  choice3: "<",
  choice4: ">",
  answer: "<",
 
}, {
  multipleAnswers: false,
  question: "What is used to set the background color in HTML?",
  choice1:"font-size",
  choice2: "color",
  choice3: "background-color",
  choice4: "text-align",
  answer: "background-color",
 
},{

  multipleAnswers: false,
  question: "What is the tag used for listing items in HTML?",
  choice1: "<li>",
  choice2: "<ol>",
  choice3: "<dl>",
  choice4: "<ul>",
  answer: "<li>",
},{

  multipleAnswers: false,
  question: "What is the <audio> tag used for in HTML?",
  choice1: "Used to display audio content",
  choice2: "Used to display JavaScript code",
  choice3: "Used to display data tables",
  choice4: "Used to display images",
  answer:  "Used to display audio content",

},{

  multipleAnswers: false,
  question: "What is the HTML tag used for displaying text?",
  choice1: "<p>",
  choice2: "<h1>",
  choice3: "<div>",
  choice4: "<span>",
  answer: "<p>",

},{

  multipleAnswers: false,
  question: "The tag used for linking URLs in HTML is?",
  choice1: "<img>",
  choice2: "<a>",
  choice3: "<link>",
  choice4: "<script>",
  answer:"<a>",

},{

  multipleAnswers: false,
  question: "How is the <iframe> tag used in HTML?",
  choice1: "It is used to display videos",
  choice2: "It is used to display images",
  choice3: "It is used to display content from other websites",
  choice4: "It is used to create navigation menus",
  answer: "It is used to display content from other websites",

},{

  multipleAnswers: false,
  question: "The tag used to add images in HTML is: <img>",
  choice1: "<figure>",
  choice2: "<picture>",
  choice3: "<img>",
  choice4: "<canvas>",
  answer: "<img>",

},{

  multipleAnswers: false,
  question:"In HTML, what are the benefits of using the <header> header?",
  choice1: "Help the website look beautiful",
  choice2: "Help users to load websites faster",
  choice3: "Help standardize the website",
  choice4: "Make it easier for users to access different parts of the website",
  answer: "Make it easier for users to access different parts of the website",
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
      game_name: "HTML",
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






