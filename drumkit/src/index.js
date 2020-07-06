function handleStartPlay(e) {
  const { keyCode } = e;
  const key = document.querySelector(`.key[data-key='${keyCode}']`);
  const audio = document.querySelector(`audio[data-key='${keyCode}']`);

  if (audio) {
    audio.currentTime = 0; // rewind to start
    key.classList.add("key--playing");
    // audio.play();
  }
}

function handleStopPlay(e) {
  const { keyCode } = e;
  const key = document.querySelector(`[data-key='${keyCode}']`);

  key.classList.remove("key--playing");
}

window.addEventListener("keydown", handleStartPlay);
window.addEventListener("keyup", handleStopPlay);
