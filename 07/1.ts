// Run with
// `ts-node filename example.txt`
import path from 'node:path'
import { readInput, sum } from '../utils'

const part = (input: string) => {
  const commandsWithOutputs = input.split('$').filter(Boolean)
  let pwd = '/'
  const sizes = new Map<string, number>()
  for (const commandWithOutput of commandsWithOutputs) {
    const [command, ...output] = commandWithOutput.split('\n').map(x => x.trim())
    if (command.startsWith('cd ')) {
      const dir = command.slice(3)
      if (dir.startsWith('/')) {
        pwd = dir
      } else {
        pwd = path.resolve(pwd, dir)
      }
    }

    if (command === 'ls') {
      const size: number = output.reduce((prev, current) => {
        if (current.startsWith('dir')) return prev
        const [sizeString] = current.split(' ')
        return prev + +sizeString
      }, 0)
      sizes.set(pwd, size)
    }

    console.log({ pwd })
  }
  const smallDirsSize = Array.from(sizes.entries()).map((entry, index, array) => {
    const [dir, size] = entry
    return array
      .filter(([x]) => x.startsWith(dir))
      .map(([, size]) => size)
      .reduce(sum, 0)
  }).filter(x => x < 100000).reduce(sum)

  return smallDirsSize
}

const main = async () => {
  const input = await readInput()
  const result = part(input)
  console.log(`Result: \n${result}`)
}

main()
  .catch(e => console.error(e))
