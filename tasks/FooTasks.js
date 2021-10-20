const tasks = {
  xfoo1: `echo "a direct shell command xfoo1"`,
  xfoo2: `echo "a direct shell command xfoo2"`,
  xfoo3: `echo "a direct shell command xfoo3"`,
  xfoo4: () => console.log("hello, this is xfoo4"),
  foo2: ["xfoo1", "xfoo2", "xfoo3", "xfoo4"],
  foo3: {
    desc: "description for task foo3",
    task: () => {
      console.log("function task for foo3");
    }
  }
};


const finalHookHandler = async () => {
  let results = false

  try {
    await console.log(`I AM finalHookHandler`)
    results = true
    return results
  }
  catch(err){
    console.error(err)
    if(process.exitCode) {
      process.exit(process.exitCode)
    }
    process.exit(1)
  }
}

export const FooSubOne = `echo "a direct shell command: FooSubOne"`
export const FooSubTwo = () => console.log(`console.log |> a direct function command: FooSubTwo`)
export const FooSubThree = {
  desc: `description for task FooSubThree`,
  task: () => {
    console.log(`console.log |> a object with task prop as function command: FooSubThree`);
  },
  dep: [`FooSubTwo`],
  finally: finalHookHandler
}
export const FooSubFour = {
  desc: `show argv from task options and is description for task FooSubFour`,
  task: async () => {
    let results

    try {
      await console.log(`console.log |> a object with task prop as ASYNC function command: FooSubFour`);
      results = process.argv
      await console.log(results)
      return results
    }
    catch(err){
      console.error(err)
      if(process.exitCode) {
        process.exit(process.exitCode)
      }
      process.exit(1)
    }
  },
  finally: finalHookHandler
}
export const FooSubFive = () => console.log("hello, a direct function command: FooSubFive")

export const FooMain = [
  `FooSubOne`,
  `FooSubTwo`,
  `FooSubThree`,
  `FooSubFour`,
  `FooSubFive`
]

const FooTasks = () => FooMain
export default FooTasks

// const FOO_TASK_NAMESPACE = `Foo`
// const FOO_TASK_LABELS = [
//   `Main`,
//   `SubOne`,
//   `SubTwo`,
//   `SubThree`,
//   `SubFour`,
//   `SubFive`
// ]






// const PRIMARY_IDENTIFIER_TOKEN = `_`
// const PRIMARY_IDENTIFIER_SYMBOL = Symbol(PRIMARY_IDENTIFIER_TOKEN)
// const OPTIONAL_IDENTIFIER_TOKEN = `~`
// const OPTIONAL_IDENTIFIER_SYMBOL = Symbol(OPTIONAL_IDENTIFIER_TOKEN)
// const INTERNAL_KEYS_IDENTIFIER_PREFIX_TOKEN = `#`
// const INTERNAL_KEYS_IDENTIFIER_PREFIX_SYMBOL = Symbol(INTERNAL_KEYS_IDENTIFIER_PREFIX_TOKEN)
// const PRIVATE_KEYS_PREFIX_TOKEN = `__`
// const PRIVATE_KEYS_PREFIX_SYMBOL = Symbol(PRIVATE_KEYS_PREFIX_TOKEN)
// const PRIVATE_KEYS_SUFFIX_TOKEN = `__`
// const PRIVATE_KEYS_SUFFIX_SYMBOL = Symbol(PRIVATE_KEYS_SUFFIX_TOKEN)
//
// const INTERNAL_KEYS_TOKEN = `${INTERNAL_KEYS_IDENTIFIER_PREFIX_SYMBOL.description}keys`
// const INTERNAL_KEYS_SYMBOL = Symbol(INTERNAL_KEYS_TOKEN)
// const INTERNAL_ALIAS_KEYS_TOKEN = `#aliasKeys`
// const INTERNAL_ALIAS_KEYS_SYMBOL = Symbol(INTERNAL_ALIAS_KEYS_TOKEN)
// const INTERNAL_PROPS_TOKEN = `#props`
// const INTERNAL_PROPS_SYMBOL = Symbol(INTERNAL_PROPS_TOKEN)
// const INTERNAL_COUNT_TOKEN = `#count`
// const INTERNAL_COUNT_SYMBOL = Symbol(INTERNAL_COUNT_TOKEN)
//
//
//
// const LEGEND_INTERNALS = {
//   [PRIMARY_IDENTIFIER_SYMBOL]: PRIMARY_IDENTIFIER_SYMBOL.description,
//   [OPTIONAL_IDENTIFIER_SYMBOL]: OPTIONAL_IDENTIFIER_SYMBOL.description
// }
//
//
//
// const NAMESPACE_PRIMARY_TOKEN = `namespace`
// const NAMESPACE_PRIMARY_SYMBOL = Symbol(NAMESPACE_PRIMARY_TOKEN)
// const NAMESPACE_OPTIONAL_TOKEN = `ns`
// const NAMESPACE_OPTIONAL_SYMBOL = Symbol(NAMESPACE_OPTIONAL_TOKEN)
//
// const NAMESPACE_TOKENS_LIST = [NAMESPACE_PRIMARY_SYMBOL.description, NAMESPACE_OPTIONAL_SYMBOL.description]
// const NAMESPACE_SYMBOLS_LIST = [NAMESPACE_PRIMARY_SYMBOL, NAMESPACE_OPTIONAL_SYMBOL]
//
// const RESERVED_TOKENS_MAP = [
//   NAMESPACE: {
//     [LEGEND_INTERNALS[PRIMARY_IDENTIFIER_SYMBOL]]: `namespace`,
//     [LEGEND_INTERNALS[OPTIONAL_IDENTIFIER_SYMBOL]]: [`ns`],
//   }
// ]
//
// const FOO_TASK_NAMESPACE_LEGEND = new Map([
//   [
//     new Map([
//       [LEGEND_INTERNALS.primaryIdentifier, `namespace`],
//       [LEGEND_INTERNALS.optionalIdentifier, [`ns`]]
//     ]),
//     FOO_TASK_NAMESPACE
//   ],
//   [
//     INTERNAL_KEYS_SYMBOL, () =>
//                             FOO_TASK_NAMESPACE_MAPPER
//                               .keys()
//                               .filter(k =>
//                                 k !== INTERNAL_KEYS_SYMBOL &&
//                                 k !== INTERNAL_ALIAS_KEYS_SYMBOL &&
//                                 k !== INTERNAL_PROPS_TOKEN &&
//                                 k !== INTERNAL_COUNT_SYMBOL
//                               )
//   ],
//   [
//     INTERNAL_KEYS_SYMBOL, () =>
//                             FOO_TASK_NAMESPACE_MAPPER
//                               .keys()
//                               .filter(k =>
//                                 k !== INTERNAL_KEYS_SYMBOL &&
//                                 k !== INTERNAL_ALIAS_KEYS_SYMBOL &&
//                                 k !== INTERNAL_PROPS_TOKEN &&
//                                 k !== INTERNAL_COUNT_SYMBOL
//                               )
//   ],
//   [
//     INTERNAL_COUNT_TOKEN, () =>
//                             FOO_TASK_NAMESPACE_MAPPER
//                               .keys()
//                               .filter(k =>
//                                 k !== INTERNAL_KEYS_SYMBOL &&
//                                 k !== INTERNAL_ALIAS_KEYS_SYMBOL &&
//                                 k !== INTERNAL_PROPS_TOKEN &&
//                                 k !== INTERNAL_COUNT_SYMBOL
//                               )
//                               .length
//   ]
// ])
//
// const FOO_TASK_MAP = new Map([
//   [`main`, {
//     label: `${FOO_TASK_NAMESPACE}${FOO_TASK_LABELS[0]}`,
//     task: FooMain,
//     tree: `[
//         FooSubOne,
//         FooSubTwo,
//         [
//           FooSubThree, [
//             FooSubTwo
//           ]
//         ],
//         FooSubFour,
//         FooSubFive
//       ]
//     ]`
//   }],
//   [`one`, {
//     label: `${FOO_TASK_NAMESPACE}${FOO_TASK_LABELS[1]}`,
//     task: FooSubOne,
//     tree: null
//   }],
//   [`two`, {
//     label: `${FOO_TASK_NAMESPACE}${FOO_TASK_LABELS[2]}`,
//     task: FooSubTwo,
//     tree: null
//   }],
//   [`three`, {
//     label: `${FOO_TASK_NAMESPACE}${FOO_TASK_LABELS[3]}`,
//     task: FooSubThree,
//     tree: `[
//       FooSubThree, [
//         FooSubTwo
//       ]
//     ]`
//   }],
//   [`four`, {
//     label: `${FOO_TASK_NAMESPACE}${FOO_TASK_LABELS[4]}`,
//     task: FooSubFour,
//     tree: null
//   }],
//   [`five`, {
//     label: `${FOO_TASK_NAMESPACE}${FOO_TASK_LABELS[5]}`,
//     task: FooSubFour,
//     tree: null
//   }]
// ])
//
// const FOO_TASK_LIST = new Map([
//   [`list`,
//     FOO_TASK_MAP
//   ]
// ])
//
//
// const FooTasks = new Map([
//   [`ns`, `Foo`],
//   [`list`, `FooMain:${[...FooMain]}`],
//   [`FooMain`, FooMain],
//   [`FooSubOne`, FooSubOne],
//   [`FooSubThree`, FooSubThree],
//   [`FooSubFour`, FooSubFour],
//   [`FooSubFive`, FooSubFive]
// ])
