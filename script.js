// vars
const timerDisplay = document.querySelector("h1");
const buttons = document.querySelectorAll("button")
const startBtn = buttons[0];
const resetBtn = buttons[1];
const progressBar = document.getElementById('progressBar');
const totalTime = 25 * 60;

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

    const progressPercent = (timeLeft / totalTime) * 100;
    progressBar.style.width = progressPercent + '%';
}

startBtn.addEventListener("click", function() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(function() {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                alert("time is up brotha");
            }
        }, 1000);
    }
});

resetBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    isRunning = false;

    timeLeft = 25 * 60;
    updateDisplay();
});