import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedTime = null;
let intervalId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleSelectingValidDate(selectedDates[0]);
  },
};

function handleSelectingValidDate(selectedDates) {
  selectedTime = selectedDates.getTime();
  const currentTime = Date.now();
  if (selectedTime < currentTime) {
    refs.startBtn.disabled = true;
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  refs.startBtn.disabled = false;
}

flatpickr(refs.inputDateTimePicker, options);

refs.startBtn.addEventListener('click', handleStartTime);

function handleStartTime() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(handleSetInterval, 1000);
}

function handleSetInterval() {
  const currentTime = Date.now();
  const deltaTime = selectedTime - currentTime;

  if (deltaTime < 0) {
    clearInterval(intervalId);
    refs.startBtn.removeEventListener('click', handleStartTime);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  timerCountDown({ days, hours, minutes, seconds });
}

function timerCountDown({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
