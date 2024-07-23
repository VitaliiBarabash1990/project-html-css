import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let countdownInterval = null;

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    validateSelectedDate(selectedDate);
    console.log(selectedDates[0]);
  },
};


flatpickr('#datetime-picker', options);
startBtn.disabled = true;

// Функція валідації обраної дати
function validateSelectedDate(selectedDate) {
  if (selectedDate <= new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startBtn.disabled = true;
  } else {
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  }
}

// Обробник події для кнопки "Start"
startBtn.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
    startBtn.disabled = true;
    dateTimePicker.disabled = true;
  }
});

// Функція зворотного відліку
function startCountdown(targetDate) {
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      dateTimePicker.disabled = false;
      startBtn.disabled = false;
      iziToast.info({
        title: 'Information',
        message: 'Time is up!!',
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

// Функція update, оновлення інтерфейсу таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  dataDays.textContent = addZero(days);
  dataHours.textContent = addZero(hours);
  dataMinutes.textContent = addZero(minutes);
  dataSeconds.textContent = addZero(seconds);
}

// Функція addZero
function addZero(value) {
  return String(value).padStart(2, "0");
}

// Функція підрахунку значень
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