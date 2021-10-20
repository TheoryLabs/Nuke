"use strict";

const util = require("util");
const { exec, concurrent, serial, env, load } = require("@xarc/run");
const rimraf = util.promisify(require("rimraf"));



const currDate = new Date()

const tasks = {
  hello: "echo hello world",
  jsFunc() {
    console.log("JS hello world");
  },
  both: {
    desc: "invoke tasks hello and jsFunc in serial order",
    // only array at top level like this is default to serial, other times
    // they are default to concurrent, or they can be marked explicitly
    // with the serial and concurrent APIs (below).
    task: ["hello", "jsFunc"]
  },
  // invoke tasks hello and jsFunc concurrently as a simple concurrent array
  both2: concurrent("hello", "jsFunc"),
  shell: {
    desc: "Run a shell command with TTY control and set an env",
    task: exec({ cmd: "echo test", flags: "tty", env: { foo: "bar" } })
  },
  babel: exec("babel src -D lib"),
  // serial array of two tasks, first one to set env, second to invoke the babel task.
  compile: serial(env({ BABEL_ENV: "production" }), "babel"),
  // more complex nesting serial/concurrent tasks.

  // build: {
  //   desc: "Run production build",
  //   task: serial(
  //     () => rimraf("dist"), // cleanup, (returning a promise will be awaited)
  //     env({ NODE_ENV: "production" }), // set env
  //     concurrent("babel", exec("webpack")) // invoke babel task and run webpack concurrently
  //   )
  // }


  welecomeMessage: exec(`echo 🪄 THIS IS A WELCOME MESSAGE 🪄`),
  goodByeMessage: exec(`echo 🔥 BYE BYEEE 🔥`),

  buildTasksStartMessage: exec(`echo [TASK:build] Start - ${currDate.getTime()}`),
  buildTasksEndMessage: exec(`echo [TASK:build] End - ${currDate.getTime()}`),

  removePublicDir: () => rimraf(`public`),
  createPublicDir: exec(`mkdir public`),
  createPublicRootIndex: exec(`touch ./public/index.html`),
  updateIndexWithContent: exec(`echo 'THEORYLABS - ${currDate.getTime()}' > ./public/index.html`),

  buildTasks: [
    `buildTasksStartMessage`,
    `removePublicDir`,
    `createPublicDir`,
    `createPublicRootIndex`,
    `updateIndexWithContent`,
    `buildTasksEndMessage`
  ],

  build: {
    desc: `Custom build task`,
    task: [`welecomeMessage`, `buildTasks`, `goodByeMessage`]
  }
};


load(tasks);
