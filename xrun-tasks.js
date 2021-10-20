"use strict";

const util = require("util");
const { exec, concurrent, serial, env, load } = require("@xarc/run");
const rimraf = util.promisify(require("rimraf"));



const validCurrentPathOptionsMap = new Map([
  [`cwd`, process.cwd()],
  [`dir`, __dirname]
])
const pathToExecutable = (executablePathToFind = null, currentPathOption = null) => {
  const path = require('path')
  const which = require('npm-which')
  const isValid = require('is-valid-path')
  const pathIsAbsolute = require('path-is-absolute')

  const validCurrentPathOptionsList = Array.from(validCurrentPathOptionsMap.keys())
  let _validCurrentPathOptionsList

  let _executablePathToFind_
  let _currentPath_

  try {
    validCurrentPathOptionsList.push(process.cwd())
    validCurrentPathOptionsList.push(__dirname)
    validCurrentPathOptionsList.push(null)

    _validCurrentPathOptionsList = [...new Set(validCurrentPathOptionsList)]


    if(executablePathToFind === null) {
      let _errCode
      if(process.exitCode) {
        _errCode = process.exitCode
      }
      else {
        process.exitCode = 1
        _errCode = process.exitCode
      }

      let errMsg = `Expected required first argument as type String with value as name of executable`
      let err = Error(errMsg)
      if(!err.code) {
        err.code = _errCode
      }
      throw err
    }

    if(typeof executablePathToFind !== `string`) {
      let _errCode
      if(process.exitCode) {
        _errCode = process.exitCode
      }
      else {
        process.exitCode = 1
        _errCode = process.exitCode
      }

      let errMsg = `Expected required first argument as type of String. Recieved: ${typeof executablePathToFind}`
      let err = Error(errMsg)
      if(!err.code) {
        err.code = _errCode
      }
      throw err
    }

    _executablePathToFind_ = executablePathToFind
    // console.log(_executablePathToFind_)

    if(typeof currentPathOption !== `string` && currentPathOption !== null) {
      let _errCode
      if(process.exitCode) {
        _errCode = process.exitCode
      }
      else {
        process.exitCode = 1
        _errCode = process.exitCode
      }

      let errMsg = `Expected optional second argument as type of String. Recieved: ${typeof currentPathOption}`
      let err = Error(errMsg)
      if(!err.code) {
        err.code = _errCode
      }
      throw err
    }

    if(currentPathOption === null) {
      currentPathOption = process.cwd()
    }

    _currentPath_ = currentPathOption

    if(isValid(_currentPath_) === false) {
      let _errCode
      if(process.exitCode) {
        _errCode = process.exitCode
      }
      else {
        process.exitCode = 1
        _errCode = process.exitCode
      }

      let errMsg = `Expected optional second argument as type of String and to be a valid path. Recieved: ${_currentPath_}`
      let err = Error(errMsg)
      if(!err.code) {
        err.code = _errCode
      }
      throw err
    }

    if(_validCurrentPathOptionsList.includes(_currentPath_) === false) {
      if(pathIsAbsolute(_currentPath_) === false) {
        _currentPath_ = path.resolve(_currentPath_)
      }
    }
    else {
      if(_currentPath_ === _validCurrentPathOptionsList[0]) {
        _currentPath_ = process.cwd()
      }
      if(_currentPath_ === _validCurrentPathOptionsList[1]) {
        _currentPath_ = __dirname
      }
      if(_currentPath_ === process.cwd()) {
         _currentPath_ = process.cwd()
      }
      if(_currentPath_ === __dirname) {
         _currentPath_ = __dirname
      }
    }

    // console.log(_currentPath_)


    // console.log(_executablePathToFind_)
    // console.log(_currentPath_)

    let _absPathToExecutable
    const whichCheckResults = () => which.sync(_executablePathToFind_, { cwd: _currentPath_ })
    if(_absPathToExecutable === undefined) {
      _absPathToExecutable = whichCheckResults()
    }

    // console.log(_absPathToExecutable)

    return _absPathToExecutable
  }
  catch(err){
    if(err.code) {
      console.error(err)
      process.exit(err.code)
    }
    throw err
  }
}

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

  timestamp: () => console.log({
    timestamp: currDate.getTime()
  }),

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
    task: [`welecomeMessage`, `buildTasks`, `goodByeMessage`, `timestamp`]
  },

  deployProductionBuildToVercel: {
    desc: `Create production build then deploy to Vercel task`,
    task: function() {
      // console.log(this)
      // return pathToExecutable()
      // return pathToExecutable(false)
      // return pathToExecutable(`vercel`)

      // return pathToExecutable(`vercel`, null)
      // return pathToExecutable(`vercel`, false)
      // return pathToExecutable(`vercel`, `path`)
      // return pathToExecutable(`vercel`, `../path`)
      // return pathToExecutable(`vercel`)
      // return pathToExecutable(`vercel`, null)
      // return pathToExecutable(`vercel`, `noop`)
      // return pathToExecutable(`vercel`, `cwd`)
      // return pathToExecutable(`vercel`, process.cwd())
      // return pathToExecutable(`vercel`, `dir`)
      // return pathToExecutable(`vercel`, __dirname)
      // return pathToExecutable(`vercel`, `abc/*.js`)

      const vercelExecutable = pathToExecutable(`vercel`)
      // console.log(vercelExecutable)

      exec(`${vercelExecutable} --prod`)
    }
  },

  deploy: {
    desc: `[task:deploy] Vercel deployment tasks`,
    task: [`deployProductionBuildToVercel`]
  }
};


load(tasks);
