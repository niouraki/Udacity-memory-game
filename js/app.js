//Creates a list that holds all my closed
let myCard = document.getElementsByClassName("card");
let myCards = [...myCard];
console.log(myCards);

let deck = document.querySelector(".deck");

let restart = document.querySelector(".restart");

let moves = document.querySelector(".moves");

let stars = document.querySelectorAll(".fa-star");

let counting = 0;

let timer = document.querySelector("#timer");

//Array for opened cards
let openList = [];

//Array for matched cards
let matchList = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Shuffles cards and starts game
function startGame() {
  let shuffled = shuffle(myCards);
  for (let i = 0; i < shuffled.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(shuffled, function(item) {
      deck.appendChild(item);
    });
    shuffled[i].classList.remove("open", "show", "match", "no_match");
  }
  counting = 0;
}

document.onload = startGame();


//Flips card clicked
let openedCard = function() {
  this.classList.add("open", "show");
  openList.push(this);
  if (openList.length === 2) {
    countMoves();
    if (openList[0].innerHTML === openList[1].innerHTML) {
      matchedCards();
    } else if (openList[0].innerHTML != openList[1].innerHTML) {
      noMatch();
    }
  }
}

//Specifies what to do when cards match
function matchedCards() {
  openList[0].classList.remove("open", "show");
  openList[0].classList.add("match");
  openList[1].classList.remove("open", "show");
  openList[1].classList.add("match");
  matchList.push(openList[0]);
  matchList.push(openList[1]);
  openList.splice(0, 2);
}

//Specifies what to do when cards don't match
function noMatch() {
  openList[0].classList.replace("show", "no_match");
  openList[1].classList.replace("show", "no_match");
  setTimeout(function() {
    openList[0].classList.remove("open", "no_match");
    openList[1].classList.remove("open", "no_match");
  }, 1000);
  setTimeout(function() {
    openList.splice(0, 2);
  }, 1100);
}

//Counts player's moves and starts timer
function countMoves() {
  counting++;
  moves.innerHTML = counting;

  //Removes stars after a number of moves
  if (counting > 5 && counting < 10) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (counting > 10) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}


//timer
let min = 0;
let sec = 0;

function myTimer() {
  if (counting) {
    timer.innerHTML = min + " minutes " + sec + " seconds";
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
  }
}

function endGame() {
  if (matchList.length == 16) {
    clearInterval(startTimer);
  }
}


//Starts timer
let startTimer = setInterval(function() {
  myTimer()
}, 1000);



//FLips card on click
for (let x = 0; x < myCards.length; x++) {
  myCards[x].addEventListener("click", openedCard);
}

//Restarts game when the restart icon is clicked
restart.addEventListener("click", function() {
  startGame();
  counting = 0;
  moves.innerHTML = counting;
  min = 0;
  sec = 0;
  startTimer;
});
