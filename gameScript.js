//Functions
//Randomizes Color Values in Array
function random(arr) {
  for(var i = 0; i < arr.length; i++) {
    var n1 = String(Math.round(Math.random() * 256));
    var n2 = String(Math.round(Math.random() * 256));
    var n3 = String(Math.round(Math.random() * 256));
    var color = "rgb(" + n1 + ", " + n2 + ", " + n3 + ")";
    arr[i] = color; 
  }
}
//Randomizes answer based off difficulty
function problemDisplay(arr) {
  var i = 0;
  
  if (colors.maxlength === 3) {
     i = Math.round(Math.random() * 3);
  }
  else {
     i = Math.round(Math.random() * 6);
  }
  problem.innerHTML = arr[i];
}

//Score Increase Function
function scoreIncrease() {
  if (hard) {
    scoreKeeper = scoreKeeper + 10;
    scoreDisplay.innerHTML = String(scoreKeeper);
  }
  else {
    scoreKeeper = scoreKeeper + 5;
    scoreDisplay.innerHTML = String(scoreKeeper);
  }
}
//Score Decrease Function
function scoreDecrease() {
  if (scoreKeeper != 0){ 
    if (hard) {
      scoreKeeper = scoreKeeper - 5;
      scoreDisplay.innerHTML = String(scoreKeeper);
    }
    else {
      scoreKeeper = scoreKeeper - 3;
      if (scoreKeeper < 0){
        scoreKeeper = 0;
      }
      scoreDisplay.innerHTML = String(scoreKeeper);
    }
  }
}
//Score Reset Funtion
function scoreReset() {
  scoreKeeper = 0;
  scoreDisplay.innerHTML = String(scoreKeeper);
}
//Checks Answer and Changes Score Based off of parameters
function answerCheck() {
      //Grabbing Color of Clicked Square
      var clickedColor = this.style.background;
      //Compare Color to Picked Color
      if (clickedColor === answer) {
       scoreIncrease();
       removeListeners();
       checkerDisplay.innerHTML = "You're Right!!!";
       checkerDisplay.style.color = "#00ff00";
       //Reset Checker Display
       setTimeout(function(){ 
         checkerDisplay.innerHTML = "Take a Guess!";
         checkerDisplay.style.color = "#ffffff";
         newgame();
       }, 2000);
       
      }
      else {
       scoreDecrease();
       checkerDisplay.innerHTML = "Wrong!!!";
       checkerDisplay.style.color = "#ff3300";
       //Reset Checker Display
       setTimeout(function(){ 
         checkerDisplay.innerHTML = "Take a Guess!";
         checkerDisplay.style.color = "#ffffff";
       }, 2000);
       
      }
    }
//Displays Colors on each square and adds event listener
function displayColors() {
  for (var i = 0; i < squares.length; i++) {
    //Displays Color Values in the Array
    squares[i].style.background = colors[i];
  
    //add click listeners
    squares[i].addEventListener("click", answerCheck);
  }
}
//Removes Listeners on currently on each square
function removeListeners() {
   for (var i = 0; i < squares.length; i++) {
    //remove click listeners
    squares[i].removeEventListener("click", answerCheck);
  }
}

//Switch to Hard Difficulty if not currently
function hardMode() {
  if(colors.length !== 6) {
    for(var i = 3; i < 6; i++) {
      squares[i].classList.add("square");
    } 
   colors.splice(3, 0, 0, 0, 0);
   hard = true;
   diffDisplay.innerHTML = "Hard";
   diffDisplay.style.color = "#ff3300";
     }
}
//Switch to Easy Difficulty if not currently
function easyMode() {
  if(colors.length === 6) {
    for(var i = 5; i > 2; i--) {
      squares[i].classList.remove('square');  
    } 
  colors.splice(3, 3);
  hard = false;
  diffDisplay.innerHTML = "Easy";
  diffDisplay.style.color = "#00ff00";
  }
}
//New Game Initiate Function
function newgame() {
  random(colors);
  removeListeners();
  problemDisplay(colors);
  //Check if there is a Valid Problem Displayed
  for(var i = 1; i > 0; i++) {
    if (problem.innerHTML === "undefined"){
      problemDisplay(colors);
    }
    else {
      break;
    }
  }
  displayColors();
  answer = problem.innerHTML;
}
//ScreenTest function will remove and add padding if needed
function screenTest(resVar) {
  //if Window Width is between 1101px and 1500px
    if (resVar.matches) {
        if (squarePad.style.paddingTop !== "325px" && howToCheck === false) {
          squarePad.style.paddingTop = "325px";
        }    
      }
      else {
        if (squarePad.style.paddingTop !== "0px") {
          squarePad.style.paddingTop = "0px";
        }    
      }  
}

//Variables
var colors = [
  "rgb(255, 255, 0)",
  "rgb(255, 65, 20)",
  "rgb(255, 127, 100)",
  "rgb(255, 5, 0)",
  "rgb(65, 255, 0)",
  "rgb(100, 255, 10)"
];
//Global Variables Defined
var squares = document.querySelectorAll(".square");
var problem = document.getElementById("problem");
var newGameButton = document.getElementById("newgame");
var hardDiff = document.getElementById("hardmode");
var easyDiff = document.getElementById("easymode");
var scoreDisplay = document.getElementById("scoreCurrent");
var checkerDisplay = document.getElementById("checkerDisplay");
var diffDisplay = document.getElementById("diffDisplay");
var answer = 0;
var hard = true;
var scoreKeeper = 0;
var howToDisplay = document.getElementById("howTo");
var insDisplay = document.getElementById("insDisplay");
var howToCheck = false;
var squarePad = document.getElementById("squareContain");
  //Global Res Variables
var res = window.matchMedia('(max-width: 1500px)');

//Start-Up
newgame();

//Screen Res Listener
res.addListener(screenTest);
//New Game Button Clicked Event Listener
newGameButton.addEventListener("click", function(){
  scoreReset();
  newgame();
});
//Easy Game Button Clicked Event Listener
easyDiff.addEventListener("click", function(){
  easyMode();
  scoreReset();
  newgame();
});

//Hard Game Button Clicked Event Listener
hardDiff.addEventListener("click", function(){
  hardMode();
  scoreReset();
  newgame();
});

//Event Listener to make how to instructions display
howToDisplay.addEventListener("click", function(){
  if (howToCheck) {
     insDisplay.style.display = "none";
     if(res.matches){
       squarePad.style.paddingTop = "325px";
     }
    else {
      squarePad.style.paddingTop = "0px";
    }
     howToCheck = false;
   }
  else {
    insDisplay.style.display = "block";
    squarePad.style.paddingTop = "0px";
    howToCheck = true;
  }
});