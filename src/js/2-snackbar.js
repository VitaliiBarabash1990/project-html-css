import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const stateInput = form.querySelector('input[name="state"]:checked');

  const delay = parseInt(delayInput.value);
  const state = stateInput.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        icon: '',
        iconUrl: '',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        icon: '',
        iconUrl: '',
      });
    });

  delayInput.value = '';
  form.querySelectorAll('input[name="state"]').forEach(input => {
    input.checked = false;
  });

  delayInput.classList.remove('pressed');
});

delayInput.addEventListener('focus', () => {
  delayInput.classList.add('pressed');
});

delayInput.addEventListener('blur', () => {
  delayInput.classList.remove('pressed');
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
