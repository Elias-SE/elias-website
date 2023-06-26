let calculation = '';
let calculationArray = [];
document.querySelector('.js-calculation').innerHTML = calculation;
let previousCommand = '';

function handleKeydown(event) {
  if (event.key === 'Enter') {
    evaluateCalculation();
  } else if (event.key === 'Backspace') {
    deletePrevious();
  } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' ) {
    addValue(` ${event.key} `);
  } else if (event.key === '.') {
    addValue(event.key);
  } else if (event.key - event.key === 0) {
    addValue(event.key);
  } 
}

function addValue(value) {
  calculationArray.push(value);
  updateCalculation();
}

function evaluateCalculation() {
  calculationArray = [];
  calculation = Math.round(eval(calculation) * 500) / 500 || 0;
  document.querySelector('.js-calculation').innerHTML = calculation;
}

function clearCalculation() {
  calculationArray = [];
  updateCalculation();
}

function deletePrevious() {
  calculationArray.splice((calculationArray.length - 1), 1);
  updateCalculation();
}

function updateCalculation() {
  calculation = '';
  calculationArray.forEach(value => {
    calculation += value;
  })
  document.querySelector('.js-calculation').innerHTML = calculation;
}