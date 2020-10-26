// XState
const { createMachine, assign, send } = XState;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const gameMachine = createMachine({
  id: "gameMachine",
  initial: "initial",
  context: {
    remainingTime: 10,
    activeHole: null,
    score: 0
  },
  states: {
    initial: {
      on: {
        PLAY: "playing"
      }
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
          }
        },
      ],
      on: {
        TICK: {
          actions: assign({
            remainingTime: (context) => context.remainingTime - 1
          }),
          cond: (context) => context.remainingTime >= 0
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
                activeHole: nextActiveHole
              };
            }),
            send("PEEP", { delay: 'peepDelay' })
          ]
        },
        BONK: {
          actions: assign({
            score: (context) => context.score + 1
          }),
        },
      },
      entry: send("PEEP"),
      always: [
        { target: "finished", cond: (context) => context.remainingTime === 0 }
      ]
    },
    finished: {
      type: "final",
      entry: assign({
        activeHole: null
      })
    },
  }
}, {
  delays: {
    peepDelay: () => getRandomInt(600, 800),
  }
});

export default gameMachine;
