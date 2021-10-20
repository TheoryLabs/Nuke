// const tasks = {
//   xfoo1: `echo "a direct shell command xfoo1"`,
//   xfoo2: `echo "a direct shell command xfoo2"`,
//   xfoo3: `echo "a direct shell command xfoo3"`,
//   xfoo4: () => console.log("hello, this is xfoo4"),
//   foo2: ["xfoo1", "xfoo2", "xfoo3", "xfoo4"],
//   foo3: {
//     desc: "description for task foo3",
//     task: () => {
//       console.log("function task for foo3");
//     }
//   }
// };

// import * as xrun from '@xarc/run'

import FooTasks from './FooTasks'


// xrun.load(tasks)

const PROJECT_NAMESPACE_TOKEN = `nuketown`
const PROJECT_NAMESPACE_SYMBOL = Symbol(PROJECT_NAMESPACE_TOKEN)

const ProjectTasks = {
  FOO: FooTasks
}

xrun.load(PROJECT_NAMESPACE_SYMBOL.description, ProjectTasks)
