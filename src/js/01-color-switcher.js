const body = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const colorSwitcher = {
  intervalId: null,
  isActive: false,
  onStartChangeBodyBg() {
    if (this.isActive) {
      return;
    }
    this.intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    this.isActive = true;
  },
  onStopChangeBodyBg() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

startBtnEl.addEventListener('click', () => {
  colorSwitcher.onStartChangeBodyBg();
});
stopBtnEl.addEventListener('click', () => {
  colorSwitcher.onStopChangeBodyBg();
});