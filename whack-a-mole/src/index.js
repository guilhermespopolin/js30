import createWhackAMoldeMachine from "./whackAMoleMachine.js";

const playBtn = document.querySelector(".play");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreboard = document.querySelector(
  '.scoreboard__item__value[data-item="score"]'
);
const timer = document.querySelector(
  '.scoreboard__item__value[data-item="timer"]'
);

function updateUI(state) {
  const { activeHole, remainingTime, score } = state.context;

  // enable/disable controls
  if (state.matches("playing")) {
    playBtn.setAttribute("disabled", "");
  } else {
    playBtn.removeAttribute("disabled");
  }

  // update score
  scoreboard.textContent = score;

  // update timer
  timer.textContent = `00:${
    remainingTime > 9 ? remainingTime : "0" + remainingTime
  }`;

  // update holes
  holes.forEach((hole) => {
    if (hole.classList.contains("hole--active")) {
      hole.classList.remove("hole--active");
    }
  });

  if (activeHole != undefined) {
    holes[activeHole].classList.add("hole--active");
  }
}

const gameService = XState.interpret(createWhackAMoldeMachine())
  .onTransition((state) => updateUI(state))
  .start();

playBtn.addEventListener("click", () => {
  if (gameService.state.matches("initial")) {
    gameService.send("PLAY");
  } else {
    gameService.send("PLAY_AGAIN");
  }
});

moles.forEach((mole, index) =>
  mole.addEventListener("click", (e) => {
    if (e.isTrusted) {
      gameService.send({ type: "BONK", hole: index });
    }
  })
);
