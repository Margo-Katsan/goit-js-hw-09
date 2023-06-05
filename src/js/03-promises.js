import { Notify } from 'notiflix/build/notiflix-notify-aio';

const FormEl = document.querySelector('.form');
const inputFirstDelayEl = document.querySelector('input[name="delay"]');
const inputStepDelayEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');
let isActive = false;
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      else {
        reject({ position, delay });
      }
    }, delay);
  });
};

FormEl.addEventListener('submit', event => {
  event.preventDefault();
  let del = parseInt(inputFirstDelayEl.value);
  
  if (isActive) {
    return;
  }
  for (let i = 1; i <= parseInt(inputAmountEl.value); i++) {
    isActive = true;
    createPromise(i, del)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    del += parseInt(inputStepDelayEl.value);
    setTimeout(() => {
      isActive = false;
    }, parseInt(inputFirstDelayEl.value) + parseInt(inputStepDelayEl.value) * ((parseInt(inputAmountEl.value)) - 1));
  }
});
