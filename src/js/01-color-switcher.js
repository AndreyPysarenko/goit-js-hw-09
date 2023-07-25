const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalChangeColor = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', handleStartChangeColor);
refs.stopBtn.addEventListener('click', handleStopChangeColor);

function handleStartChangeColor() {
  intervalChangeColor = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function handleStopChangeColor() {
  clearInterval(intervalChangeColor);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
