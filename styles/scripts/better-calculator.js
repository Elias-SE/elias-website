let calculation = JSON.parse(localStorage.getItem('calculation')) || '';
let calculationArray = JSON.parse(localStorage.getItem('calculationArray')) || [];
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
  saveCalculation();
}

function evaluateCalculation() {
  calculationArray = [];
  calculation = Math.round(eval(calculation) * 500) / 500 || 0;
  document.querySelector('.js-calculation').innerHTML = calculation;
  saveCalculation();
}

function clearCalculation() {
  calculationArray = [];
  updateCalculation();
  saveCalculation();
}

function deletePrevious() {
  calculationArray.splice((calculationArray.length - 1), 1);
  updateCalculation();
  saveCalculation();
}

function updateCalculation() {
  calculation = '';
  calculationArray.forEach(value => {
    calculation += value;
  })
  document.querySelector('.js-calculation').innerHTML = calculation;
}

function saveCalculation() {
  localStorage.setItem('calculation', JSON.stringify(calculation));
  localStorage.setItem('calculationArray', JSON.stringify(calculationArray));
}