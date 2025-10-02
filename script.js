// vars
const timerDisplay = document.querySelector("h1");
const timerButtons = document.querySelectorAll("button:not(.shuffle-btn):not(.reset-theme-btn)");
const startBtn = timerButtons[0];
const resetBtn = timerButtons[1];
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
        // start timer
        isRunning = true;
        startBtn.textContent = "pause";
        timerInterval = setInterval(function() {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startBtn.textContent = "start";
                alert("time is up brotha");
                timeLeft = 25 * 60; // reset
                updateDisplay();
            }
        }, 1000);
    } else {
        // pause timer
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = "start";
    }
});

resetBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = "start";

    timeLeft = 25 * 60;
    updateDisplay();
});

// quote randomness

let quotes = [];
const quoteElement = document.getElementById('motivationalQuote');
const shuffleButton = document.getElementById('shuffleBtn');

// load quotes from file
async function loadQuotes() {
    try {
        const response = await fetch('quotes.txt'); // load the file
        const text = await response.text();
        quotes = text.split('\n').filter(quote => quote.trim() !== ''); // split by lines, remove empty ones
        displayRandomQuote(); // show first quote
    } catch (error) {
        console.log('Could not load quotes file');
        quotes = ["error :("]; // fallback
    }
}

// display random quote
function displayRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length); // Pick random number
        quoteElement.textContent = `"${quotes[randomIndex]}"`;
    }
}

// shuffle btn click
shuffleButton.addEventListener('click', displayRandomQuote);

// load quotes when page loads
loadQuotes();

// theme slider (0=red, 100=green, 120=purple)
const themeSlider = document.getElementById('themeSlider');
const resetThemeBtn = document.getElementById('resetTheme');

themeSlider.addEventListener('input', function() {
    document.documentElement.style.setProperty('--primary-hue', this.value);
    localStorage.setItem('themeHue', this.value);
});

resetThemeBtn.addEventListener('click', function() {
    themeSlider.value = 100;
    document.documentElement.style.setProperty('--primary-hue', '100');
});

// start/pause shortcut (spacebar)
document.addEventListener('keydown', function(e) {
    if (e.code == 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        startBtn.click();
    }
});

// save theme prefs
const savedHue = localStorage.getItem('themeHue');
if (savedHue) {
    themeSlider.value = savedHue;
    document.documentElement.style.setProperty('--primary-hue', savedHue);
}