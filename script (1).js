// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 10;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString();

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 100);
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.0';
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = timeToString(elapsedTime);
        lapsList.appendChild(lapTime);
    }
});
