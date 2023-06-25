let calculation = localStorage.getItem('calculation') || '';
document.querySelector('.js-calculation').innerHTML = calculation;
let previousCommand = '';

function handleKeydown(event) {
  if (event.key === 'Enter') {
    evaluateCalculation();
  } else if (event.key === 'Backspace') {
    deletePrevious();
  } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' ) {
    updateCalculation(` ${event.key} `);
  } else if (event.key === '.') {
    updateCalculation(event.key);
  } else if (event.key - event.key === 0) {
    updateCalculation(event.key);
  } 
}

function updateCalculation(value) {
  calculation += value;
  document.querySelector('.js-calculation').innerHTML = calculation;
  localStorage.setItem('calculation', calculation);
  previousCommand = value;
}

function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}

function evaluateCalculation() {
  console.log(calculation);
  calculation = Math.round(eval(calculation) * 500) / 500;
  document.querySelector('.js-calculation').innerHTML = calculation;
  calculation = '';
  localStorage.setItem('calculation', calculation);
}

function clearCalculation() {
  calculation = '';
  document.querySelector('.js-calculation').innerHTML = calculation;
  localStorage.setItem('calculation', calculation);
}

function deletePrevious() {
  calculation = calculation.replace(previousCommand, '');
  document.querySelector('.js-calculation').innerHTML = calculation;
  localStorage.setItem('calculation', calculation);
}