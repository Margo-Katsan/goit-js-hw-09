import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const startBtnEl = document.querySelector('button[data-start]');
const daysSpanEl = document.querySelector('span[data-days]');
const hoursSpanEl = document.querySelector('span[data-hours]');
const minutesSpanEl = document.querySelector('span[data-minutes]');
const secondsSpanEl = document.querySelector('span[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updatingTimer(startTime) {
  const { days, hours, minutes, seconds } = convertMs(startTime);
  daysSpanEl.textContent = addLeadingZero(days);
  hoursSpanEl.textContent = addLeadingZero(hours);
  minutesSpanEl.textContent = addLeadingZero(minutes);
  secondsSpanEl.textContent = addLeadingZero(seconds);
}

const timer = {
  isActive: false,
  intervalId: null,
  start(selectedDates) {
    if (this.isActive) {
      return;
    }
    
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const startTime = (Date.now() - selectedDates[0]) * (-1);
      updatingTimer(startTime);
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(this.intervalId);
        startBtnEl.setAttribute("disabled", null);          
        this.isActive = false;
        return;
      }
  
    }, 1000);
  },
}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() - selectedDates[0] > 0) {
      Notify.init({
        width: '500px',
        position: 'center-top',
      })
      Notify.failure('Please choose a date in the future');
      return;
    }

    startBtnEl.removeAttribute("disabled");

    startBtnEl.addEventListener('click', () => {
      timer.start(selectedDates);
    });
  },
});


