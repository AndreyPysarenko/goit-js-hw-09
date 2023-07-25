import Notiflix from 'notiflix';

const onFormRef = document.querySelector('.form');

onFormRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let firstDelay = Number(onFormRef.delay.value);
  const stepDelay = Number(onFormRef.step.value);
  const amount = Number(onFormRef.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    firstDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
