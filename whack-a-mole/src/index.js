import whackAMoleMachine from './whackAMoleMachine.js';

const playBtn = document.querySelector('.play');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreboard = document.querySelector('.scoreboard__item__value[data-item="score"]');
const timer = document.querySelector('.scoreboard__item__value[data-item="timer"]');

function draw(state) {
  const { activeHole, remainingTime, score } = state.context;

  // update score
  scoreboard.textContent = score;

  // update timer
  timer.textContent = `00:${remainingTime > 9 ? remainingTime : '0' + remainingTime}`;

  // update holes
  holes.forEach(hole => {
    if (hole.classList.contains('hole--active')) {
      hole.classList.remove('hole--active');
    }
  });

  if (activeHole != undefined) {
    holes[activeHole].classList.add('hole--active');
  }
}

const gameService = XState.interpret(whackAMoleMachine)
  .onTransition(state => draw(state))
  .start();

playBtn.addEventListener('click', () => gameService.send('PLAY'));

moles.forEach(mole => mole.addEventListener('click', (e) => {
  if (e.isTrusted) {
    gameService.send('BONK');
  }
}))
