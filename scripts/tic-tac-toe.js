let squareArray = [];
let squareNumber = 0;
let isGenerating = false;
let gameIsRunning = true;
let score = {
  wins:  0,
  losses: 0,
  ties: 0
};
const resultDisplay = document.querySelector('.js-result-display');
const startButton = document.querySelector('.js-start-button');
const gridContainer = document.querySelector('.js-grid-container');
const scoreDisplay = document.querySelector('.js-score-display');
const statsContainer = document.querySelector('.js-stats-container');

displayResult();

startButton
  .addEventListener('click', () => {
    startButton.innerHTML = 'Restart Game';
    squareArray = [];
    squareNumber = 0;
    gameIsRunning = true;
    resultDisplay.innerHTML = '';
    for (i = 1; i < 10; i++) {
      document.querySelector(`.js-square${i}`).classList.remove('circle');
      document.querySelector(`.js-square${i}`).classList.remove('rectangle');
    }
  });

gridContainer
  .addEventListener('click', () => {
    if (squareNumber && !(checkSquareArrayFor(squareNumber)) && !(isGenerating) && gameIsRunning) {
      squareArray.push(squareNumber);
      document.querySelector(`.js-square${squareNumber}`).classList.add('circle');
      displayResult();
      if (resultDisplay.innerHTML === '') {
        isGenerating = true;
        setTimeout(() => {
          generateComputerMove();
          displayResult();
          isGenerating = false;
        }, 400)
      }
    }});

function checkSquareArrayFor(number) {
  let included = false;
  squareArray.forEach(value => {
    if (value === number) {
      included = true;
    }
  })
  return included;
}

function generateRandomNumber() {
  let randomNumber = 10;
  while (randomNumber > 9) {
    randomNumber = Math.floor((Math.random() + 0.1) * 10);
  }
  return randomNumber;
}

function generateComputerMove() {
  const randomNumber = generateRandomNumber();
  if (calculatePossibleWin('rectangle')) {
    squareArray.push(possibleWinSquare);
    document.querySelector(`.js-square${possibleWinSquare}`).classList.add('rectangle');
  } else if (calculatePossibleWin('circle')) {
    squareArray.push(possibleWinSquare);
    document.querySelector(`.js-square${possibleWinSquare}`).classList.add('rectangle');
  } else if (!(checkSquareArrayFor(5))) {
    squareArray.push(5);
    document.querySelector(`.js-square5`).classList.add('rectangle');
  } else if (!(checkSquareArrayFor(randomNumber))) {
    squareArray.push(randomNumber);
    document.querySelector(`.js-square${randomNumber}`).classList.add('rectangle');
  } else {
    generateComputerMove();
  }
}

function hasClass(element, string) {
  return document.querySelector(element).classList.contains(string);
}

function checkWinFor(shape) {
  if (
    ((hasClass('.js-square1', shape) || hasClass('.js-square1', 'sim-circle'))
    && (hasClass('.js-square2', shape) || hasClass('.js-square2', 'sim-circle'))
    && (hasClass('.js-square3', shape) || hasClass('.js-square3', 'sim-circle'))) ||

    ((hasClass('.js-square4', shape) || hasClass('.js-square4', 'sim-circle'))
    && (hasClass('.js-square5', shape) || hasClass('.js-square5', 'sim-circle'))
    && (hasClass('.js-square6', shape) || hasClass('.js-square6', 'sim-circle'))) ||

    ((hasClass('.js-square7', shape) || hasClass('.js-square7', 'sim-circle'))
    && (hasClass('.js-square8', shape) || hasClass('.js-square8', 'sim-circle'))
    && (hasClass('.js-square9', shape) || hasClass('.js-square9', 'sim-circle'))) ||

    ((hasClass('.js-square1', shape) || hasClass('.js-square1', 'sim-circle'))
    && (hasClass('.js-square4', shape) || hasClass('.js-square4', 'sim-circle'))
    && (hasClass('.js-square7', shape) || hasClass('.js-square7', 'sim-circle'))) ||

    ((hasClass('.js-square2', shape) || hasClass('.js-square2', 'sim-circle'))
    && (hasClass('.js-square5', shape) || hasClass('.js-square5', 'sim-circle'))
    && (hasClass('.js-square8', shape) || hasClass('.js-square8', 'sim-circle'))) ||

    ((hasClass('.js-square3', shape) || hasClass('.js-square3', 'sim-circle'))
    && (hasClass('.js-square6', shape) || hasClass('.js-square6', 'sim-circle'))
    && (hasClass('.js-square9', shape) || hasClass('.js-square9', 'sim-circle'))) ||

    ((hasClass('.js-square1', shape) || hasClass('.js-square1', 'sim-circle'))
    && (hasClass('.js-square5', shape) || hasClass('.js-square5', 'sim-circle'))
    && (hasClass('.js-square9', shape) || hasClass('.js-square9', 'sim-circle'))) ||

    ((hasClass('.js-square7', shape) || hasClass('.js-square7', 'sim-circle'))
    && (hasClass('.js-square5', shape) || hasClass('.js-square5', 'sim-circle'))
    && (hasClass('.js-square3', shape) || hasClass('.js-square3', 'sim-circle')))
  ) {
    return true;
  } else {
    return false;
  }
}

function displayResult() {
  if (checkWinFor('circle')) {
    resultDisplay.innerHTML = 'You win!';
    stopGame();
    score.wins++;

  } else if (checkWinFor('rectangle')) {
    resultDisplay.innerHTML = 'You lose.';
    stopGame();
    score.losses++;

  } else if (squareArray.length === 9) {
    resultDisplay.innerHTML = 'Tie.';
    stopGame();
    score.ties++;

  } else {
    resultDisplay.innerHTML = '';
  }
  scoreDisplay.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function calculatePossibleWin(shape) {
  for (i = 1; i < 10; i++) {
    document.querySelector(`.js-square${i}`).classList.add('sim-circle');
    if ((checkWinFor(shape)) && !(squareArray.includes(i))) {
      console.log('detected');
      possibleWinSquare = i; // how does this not give back an error when i haven't defined possibleWinSquare?
      document.querySelector(`.js-square${i}`).classList.remove('sim-circle');
      return true;
    }
    document.querySelector(`.js-square${i}`).classList.remove('sim-circle');
  }
  return false;
}

function stopGame() {
  gameIsRunning = false;
  startButton.innerHTML = 'Start Game';
}

// when theres 2 possible wins, the function will always return the possibleWinSquare with the lower number

/*
let possibleWinSquare = 0;
function calculatePossibleWinShort() {
  for (i = 1; i < 10; i++) {
    if (!(hasClass(`.js-square${i}`, 'circle'))) {
      document.querySelector(`.js-square${i}`).classList.add('circle');
      if (checkWinFor('circle') === true) {
        console.log('true');
        possibleWinSquare = i;
        document.querySelector(`.js-square${i}`).classList.remove('circle');
        return true;
      }
    }
  }
  return false;
}
*/

/*
features:
  - make it, so if the computer has already placed in the middle and doesn't see a win for  himself or the player, he places in an edge (1, 3, 7, 9) to have 2 possible wins for himself next game
  - when the game is over display a container that has...
    - the result
    - a button to restart the game
    - an all time wins and losses display
    - a button that clears the all time record




    - when clicking a div, it applies 2 classes: real-circle and circle

    (document.querySelector(`.js-square1`).classList.contains(shape)
    && document.querySelector(`.js-square2`).classList.contains(shape)
    && document.querySelector(`.js-square3`).classList.contains(shape)) ||

    (document.querySelector(`.js-square4`).classList.contains(shape)
    && document.querySelector(`.js-square5`).classList.contains(shape)
    && document.querySelector(`.js-square6`).classList.contains(shape)) ||

    (document.querySelector(`.js-square7`).classList.contains(shape)
    && document.querySelector(`.js-square8`).classList.contains(shape)
    && document.querySelector(`.js-square9`).classList.contains(shape)) ||

    (document.querySelector(`.js-square1`).classList.contains(shape)
    && document.querySelector(`.js-square4`).classList.contains(shape)
    && document.querySelector(`.js-square7`).classList.contains(shape)) ||

    (document.querySelector(`.js-square2`).classList.contains(shape)
    && document.querySelector(`.js-square5`).classList.contains(shape)
    && document.querySelector(`.js-square8`).classList.contains(shape)) ||

    (document.querySelector(`.js-square3`).classList.contains(shape)
    && document.querySelector(`.js-square6`).classList.contains(shape)
    && document.querySelector(`.js-square9`).classList.contains(shape)) ||

    (document.querySelector(`.js-square1`).classList.contains(shape)
    && document.querySelector(`.js-square5`).classList.contains(shape)
    && document.querySelector(`.js-square9`).classList.contains(shape)) ||

    (document.querySelector(`.js-square7`).classList.contains(shape)
    && document.querySelector(`.js-square5`).classList.contains(shape)
    && document.querySelector(`.js-square3`).classList.contains(shape))


  win: 
    - if square${i}, square${i + 1}, square${i + 2} have classList.contains(circle) = true
    - if square${i}, square${i + 3}, square${i + 6} have classList.contains(circle) = true
    - if all the squares in a row have classList.contains(circle) = true
    - if all the squares in a column have classList.contains(circle) = true
    - if the squares 1, 5, 9 have circle
    - if the squares 7, 5, 3 have circle


    - only run the win function if squareArray.length >= 5, because you can only win after 5 moves (makes the code faster)
  */