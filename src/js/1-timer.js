import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const [daysValue, hoursValue, minutesValue, secondsValue] =
  document.querySelectorAll('.value');

let userSelectedDate;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();
    startButton.disabled = userSelectedDate < now;
    if (!startButton.disabled) return;
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
  },
});

let timer = null;

function startCountdown() {
  const endDate = new Date(userSelectedDate).getTime();
  const now = new Date().getTime();
  const distance = endDate - now;
  if (distance <= 0) {
    clearInterval(timer);
    [daysValue, hoursValue, minutesValue, secondsValue].forEach(
      value => (value.textContent = '00')
    );
    startButton.disabled = false;
    datetimePicker.disabled = false;
    return;
  }

  const [days, hours, minutes, seconds] = [
    Math.floor(distance / (1000 * 60 * 60 * 24)),
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    Math.floor((distance % (1000 * 60)) / 1000),
  ];

  [daysValue, hoursValue, minutesValue, secondsValue].forEach(
    (value, index) => {
      const timeValue = [days, hours, minutes, seconds][index];
      value.textContent = timeValue < 10 ? '0' + timeValue : timeValue;
    }
  );
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  const endDate = new Date(userSelectedDate).getTime();
  const now = new Date().getTime();
  if (endDate <= now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = false;
    datetimePicker.disabled = false;
    return;
  }

  startCountdown();
  timer = setInterval(startCountdown, 1000);
});
