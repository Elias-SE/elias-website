let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();

  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    }
  }
  */

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose.'
    } else if (computerMove === 'paper') {
      result = 'You win.'
    } else {
      result = 'Tie.'
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
    result = 'You win.'
    } else if (computerMove === 'paper') {
      result = 'Tie.'
    } else {
      result = 'You lose.'
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
    result = 'Tie.'
    } else if (computerMove === 'paper') {
      result = 'You lose.'
    } else {
      result = 'You win.'
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerText = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
      <img src="images/${playerMove}-emoji.png">
      <img src="images/${computerMove}-emoji.png">
      Computer`

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}