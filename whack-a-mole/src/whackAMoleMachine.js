// XState
const { createMachine, assign, send } = XState;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createWhackAMoldeMachine(time = 10) {
  const initialContext = {
    remainingTime: time,
    lastActiveHole: null,
    activeHole: null,
    score: 0,
  };

  return createMachine(
    {
      id: "gameMachine",
      initial: "initial",
      context: initialContext,
      states: {
        initial: {
          on: {
            PLAY: "playing",
          },
        },
        playing: {
          invoke: [
            {
              id: "timer",
              src: () => (cb) => {
                const timerInterval = setInterval(() => {
                  cb("TICK");
                }, 1000);

                return () => clearInterval(timerInterval);
              },
            },
          ],
          on: {
            TICK: {
              actions: assign({
                remainingTime: (context) => context.remainingTime - 1,
              }),
              cond: (context) => context.remainingTime >= 0,
            },
            PEEP: {
              actions: [
                assign((context) => {
                  let nextActiveHole = getRandomInt(0, 6);
                  while (nextActiveHole === context.activeHole) {
                    nextActiveHole = getRandomInt(0, 6);
                  }

                  return {
                    ...context,
                    lastActiveHole: context.activeHole,
                    activeHole: nextActiveHole,
                  };
                }),
                send("PEEP", { delay: "peepDelay" }),
              ],
            },
            BONK: {
              actions: assign({
                score: (context) => context.score + 1,
              }),
            },
          },
          entry: send("PEEP"),
          always: [
            {
              target: "finished",
              cond: (context) => context.remainingTime === 0,
            },
          ],
        },
        finished: {
          entry: assign({ lastActiveHole: null, activeHole: null }),
          on: {
            PLAY_AGAIN: {
              target: "playing",
              actions: [
                assign({
                  remainingTime: initialContext.remainingTime,
                  score: initialContext.score,
                }),
              ],
            },
          },
        },
      },
    },
    {
      delays: {
        peepDelay: () => getRandomInt(600, 1000),
      },
    }
  );
}

export default createWhackAMoldeMachine;
