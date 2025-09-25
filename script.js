// vars
const timerDisplay = document.querySelector("h1");
const buttons = document.querySelectorAll("button")
const startBtn = buttons[0];
const resetBtn = buttons[1];

// timer
let timeLeft = 25 * 60
let timerInterval = null;
let isRunning = false;

// funcs

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = display;
}