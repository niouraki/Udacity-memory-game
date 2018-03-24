//Creates a list that holds all my closed
let myCard = document.getElementsByClassName("card");
let myCards = [...myCard];
console.log(myCards);

let deck = document.querySelector(".deck");

//Array for opened cards
let openList = [];

//Array for matched cards
let matchList = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
  }
}

document.onload = startGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Flips card clicked
let openedCard = function() {
  this.classList.add("open", "show");
  openList.push(this);
  console.log(openList);
  if (openList.length === 2) {
    if (openList[0].innerHTML === openList[1].innerHTML) {
      matchedCards();
      matchList.push(openList[0]);
      matchList.push(openList[1]);
      console.log(matchList);
    }
  }
}

function matchedCards() {
  openList[0].classList.remove("open", "show");
  openList[0].classList.add("match");
  openList[1].classList.remove("open", "show");
  openList[1].classList.add("match");
}

//FLips card on click
for (let x = 0; x < myCards.length; x++) {
  myCards[x].addEventListener("click", openedCard);
}
