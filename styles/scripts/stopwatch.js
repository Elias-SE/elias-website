const timeDisplayElement = document.querySelector('.js-time-display');
let isRunning = false;

const units = {
  centiseconds: 0,
  seconds: 0,
  minutes: 0,
  hours: 0
};

const strings = {
  centisecondsString: '00',
  secondsString: '00',
  minutesString:  '00',
  hoursString: '00'
};

document.body
  .addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      controlTimer();
    } else if (event.key === 'Backspace') {
      resetTimer();
    }
  })

document.querySelector('.js-start-stop-button')
  .addEventListener('click', () => {
    controlTimer();
  })

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    resetTimer();
  })

function controlTimer() {
  if (!isRunning) {
    isRunning = true;
    document.querySelector('.js-start-stop-button').innerHTML = 'Stop';

    centisecondsIntervalId = setInterval(() => {
      units.centiseconds++;

      nextUnit('centiseconds', 'seconds', 100);
      nextUnit('seconds', 'minutes', 60);
      nextUnit('minutes', 'hours', 60);

      updateString('centiseconds', 'centisecondsString');
      updateString('seconds', 'secondsString');
      updateString('minutes', 'minutesString');
      updateString('hours', 'hoursString');

      timeDisplayElement.innerHTML = `${strings.hoursString}:${strings.minutesString}:${strings.secondsString}:${strings.centisecondsString}`;
    }, 10);    
  } else {
    isRunning = false;
    document.querySelector('.js-start-stop-button').innerHTML = 'Start';
    clearInterval(centisecondsIntervalId);
  }
}

function resetTimer() {
  isRunning ? controlTimer() : false
  units.centiseconds = 0;
  units.seconds = 0;
  units.minutes = 0;
  units.hours = 0;
  strings.centisecondsString = '00';
  strings.secondsString = '00';
  strings.minutesString = '00';
  strings.hoursString = '00';
  timeDisplayElement.innerHTML = `${strings.hoursString}:${strings.minutesString}:${strings.secondsString}:${strings.centisecondsString}`;
}

function nextUnit(unit, newUnit, limitNumber) {
  if (units[unit] === limitNumber) {
    units[unit] = 0;
    units[newUnit]++;
  }
}

function updateString(unit, unitString) {
  if (units[unit] < 10) {
    strings[unitString] = `0${units[unit]}`;
  } else {
    strings[unitString] = `${units[unit]}`;
  }
}